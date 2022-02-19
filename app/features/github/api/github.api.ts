import { Cache } from "es-cache"
import { GithubCommit, GithubRepo } from "../types/github"

let cache: Cache<string, unknown>

declare global {
	var __cache: Cache<string, unknown> | undefined
}

if (!global.__cache) {
	global.__cache = new Cache()
}

cache = global.__cache

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
	let repos = (await cache.get("repos")) as GithubRepo[] | null

	if (repos == null) {
		console.log("Fetching repos from GitHub...")

		repos = (await listRepoFromCurrentUser()).filter((r) => !r.private && !r.archived && !r.disabled && r.topics?.length > 0)

		console.log("Repo fetched, next is caching")

		cache.put("repos", repos, Number(process.env.GITHUB_CACHE_MS), async () => {
			console.log("Repos cache expired, fetching again")
			listRepos()
		})
	} else {
		console.log("Repos fetched from cache")
	}

	return { repos: repos.slice(0, pageSize), total: repos.length }
}

export async function listStars(pageSize = 20) {
	let stars = (await cache.get("stars")) as GithubRepo[] | null

	if (stars == null) {
		console.log("Fetching stars from GitHub...")

		stars = await listStarredRepos()

		console.log("Stars fetched, next is caching")

		cache.put("stars", stars, Number(process.env.GITHUB_CACHE_MS), async () => {
			console.log("Stars cache expired, fetching again")
			listStars()
		})
	} else {
		console.log("Stars fetched from cache")
	}

	return { stars: stars.slice(0, pageSize), total: stars.length }
}

export async function getLastCommit(repoName: string): Promise<GithubCommit> {
	let commit = (await cache.get(`${repoName}-lastcommit`)) as GithubCommit | null

	if (commit == null) {
		commit = await getLastCommitFromRepo(process.env.GITHUB_USERNAME!, repoName)

		cache.put(`${repoName}-lastcommit`, commit, Number(process.env.GITHUB_CACHE_MS), async () => {
			getLastCommit(repoName)
		})
	}

	return commit
}
