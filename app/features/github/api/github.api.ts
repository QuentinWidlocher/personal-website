import { GithubCommit, GithubRepo } from "../types/github"

type Cache = Partial<{
	repos: GithubRepo[]
	stars: GithubRepo[]
	[key: `${string}-lastcommit`]: GithubCommit
	[key: string]: unknown
}>

let cache: Cache

declare global {
	var __cache: Cache | undefined
}

if (!global.__cache) {
	global.__cache = {}
}

cache = global.__cache

function setCache<K extends keyof Cache>(key: K, value: Cache[K], timeout: number, callback: () => void) {
	cache[key] = value
	setTimeout(() => {
		delete cache[key]
		callback()
	}, timeout)
}

const baseUrl = "https://api.github.com"
const headers = {
	"Content-Type": "application/json",
	"Accept": "application/vnd.github.v3+json",
	"Authorization": `token ${process.env.GITHUB_TOKEN}`,
}

// TODO: Paginate
function listRepoFromCurrentUser(): Promise<GithubRepo[]> {
	return fetch(`${baseUrl}/user/repos?per_page=100&sort=pushed`, {
		method: "GET",
		headers,
	}).then((res) => res.json())
}

// TODO: Paginate
function listStarredRepos(): Promise<GithubRepo[]> {
	return fetch(`${baseUrl}/user/starred?per_page=100&sort=created`, {
		method: "GET",
		headers,
	}).then((res) => res.json())
}

function getLastCommitFromRepo(username: string, repoName: string): Promise<GithubCommit> {
	return fetch(`${baseUrl}/repos/${username}/${repoName}/commits?per_page=1`, {
		method: "GET",
		headers,
	})
		.then((res) => res.json())
		.then((commits) => commits[0])
}

export async function listRepos(pageSize = 20) {
	let repos = cache.repos

	if (repos == null) {
		console.log("Fetching repos from GitHub...")

		repos = (await listRepoFromCurrentUser()).filter((r) => !r.private && !r.archived && !r.disabled && r.topics?.length > 0)

		console.log("Repo fetched, next is caching")

		setCache("repos", repos, Number(process.env.GITHUB_CACHE_MS), async () => {
			console.log("Repos cache expired, fetching again")
			listRepos()
		})
	} else {
		console.log("Repos fetched from cache")
	}

	return { repos: repos.slice(0, pageSize), total: repos.length }
}

export async function listStars(pageSize = 20) {
	let stars = cache.stars

	if (stars == null) {
		console.log("Fetching stars from GitHub...")

		stars = await listStarredRepos()

		console.log("Stars fetched, next is caching")

		setCache("stars", stars, Number(process.env.GITHUB_CACHE_MS), async () => {
			console.log("Stars cache expired, fetching again")
			listStars()
		})
	} else {
		console.log("Stars fetched from cache")
	}

	return { stars: stars.slice(0, pageSize), total: stars.length }
}

export async function getLastCommit(repoName: string): Promise<GithubCommit> {
	let commit = cache[`${repoName}-lastcommit`]

	if (commit == null) {
		commit = await getLastCommitFromRepo(process.env.GITHUB_USERNAME!, repoName)

		setCache(`${repoName}-lastcommit`, commit, Number(process.env.GITHUB_CACHE_MS), async () => {
			getLastCommit(repoName)
		})
	}

	return commit
}
