import hasher from "node-object-hash"
import { Article } from "~/features/blog/types/blog"
import { getFullArticle } from "~/features/blog/utils/blog.utils.server"
import { GithubCommit, GithubRepo } from "../types/github"
import { listRepoFromCurrentUser, listStarredRepos, getLastCommitFromRepo, getFiles } from "./github.api.server"
import { captureException } from "@sentry/node"

type CachedValue<T> = {
  value: T | undefined
  setAt: number
}

type Cache = Partial<{
  repos: CachedValue<GithubRepo[]>
  reposHash: CachedValue<string>
  stars: CachedValue<GithubRepo[]>
  starsHash: CachedValue<string>
  [key: `${string}-lastcommit`]: CachedValue<GithubCommit>
  [key: string]: CachedValue<unknown>
}>

const cacheTime = 1
const staleWhileRevalidateTime = 1

export let githubCache: Cache

declare global {
  var __githubCache: Cache | undefined
}

if (!global.__githubCache) {
  global.__githubCache = {}
}

githubCache = global.__githubCache

function setCache<K extends keyof Cache>(key: K, value: NonNullable<Cache[K]>["value"], timeout?: number, callback?: () => void) {
  githubCache[key] = { value, setAt: Date.now() }
  if (timeout != null && callback != null) {
    setTimeout(() => {
      delete githubCache[key]
      callback()
    }, timeout)
  }
}

export async function listFilteredRepos() {
  return (await listRepoFromCurrentUser()).filter((r) => !r.private && !r.archived && !r.disabled && r.topics?.length > 0)
}

export function getReposSlice(repos: GithubRepo[], pageSize: number): { repos: GithubRepo[]; total: number } {
  return { repos: repos.slice(0, pageSize), total: repos.length }
}

/**
 * Implements a `stale-while-validating`-style cache where a stale info is returned while a fresh one is being cached
 */
async function getCachedOrFreshData<K extends keyof Cache, Value = NonNullable<Cache[K]>["value"]>(
  cacheKey: keyof Cache,
  getFreshData: () => Promise<Value>,
  cacheT = cacheTime,
  staleWhileRevalidateT = staleWhileRevalidateTime,
): Promise<Value> {
  let cached = githubCache[cacheKey] as CachedValue<Value> | undefined
  let result: Value

  if (cached && cached.value && cached.setAt + cacheT > Date.now()) {
    console.log(`Using cached ${cacheKey}`)
    // If the cache is still good, return it
    result = cached.value
  } else if (cached && cached.value && cached.setAt + staleWhileRevalidateT > Date.now()) {
    // Else if the cache is not good but the staleWhileRevalidateT is not over,
    // return the cache and updates it in the background
    getFreshData().then((freshData) => {
      console.log(`Updating ${cacheKey}`)
      setCache(cacheKey, freshData)
    })

    console.log(`Using stale ${cacheKey}`)
    result = cached.value
  } else {
    console.log(`Fetching fresh ${cacheKey}`)
    // Else just fetch and cache
    let freshData = await getFreshData()
    setCache(cacheKey, freshData)
    result = freshData
  }

  return result
}

export async function listRepos(pageSize = 20): Promise<ReturnType<typeof getReposSlice>> {
  let result = await getCachedOrFreshData("repos", () =>
    listFilteredRepos().then((freshRepos) => {
      setCache("reposHash", hasher().hash(freshRepos))
      return freshRepos
    }),
  )
  return getReposSlice(result ?? [], pageSize)
}

export async function listStars(pageSize = 20): Promise<ReturnType<typeof getReposSlice>> {
  let result = await getCachedOrFreshData("stars", () =>
    listStarredRepos().then((freshStars) => {
      setCache("starsHash", hasher().hash(freshStars))
      return freshStars
    }),
  )
  return getReposSlice(result ?? [], pageSize)
}

export function getLastCommit(repoName: string): Promise<GithubCommit> {
  return getCachedOrFreshData(`${repoName}-lastcommit`, () => getLastCommitFromRepo(repoName))
}

export async function getBlogArticles(): Promise<Article[]> {
  // Cache only for 5m to see more recent changes
  let result = await getCachedOrFreshData(
    `article-${process.env.GITHUB_ARTICLES_REPO}/${process.env.GITHUB_ARTICLES_PATH}`,
    async () => {
      let files = (await getFiles()) ?? []
      if (!Array.isArray(files)) {
        captureException(new Error("The github API returned something that was not an array"), {
          contexts: {
            files,
          },
        })
        return []
      } else {
        return Promise.all(files.map(getFullArticle))
      }
    },
    1000 * 60 * 5,
  )
  return result
}
