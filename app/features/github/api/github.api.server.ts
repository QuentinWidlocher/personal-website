import { GithubCommit, GithubContent, GithubRepo } from "../types/github"

const baseUrl = "https://api.github.com"
const headers = {
	"Content-Type": "application/json",
	"Accept": "application/vnd.github.v3+json",
	"Authorization": `token ${process.env.GITHUB_TOKEN}`,
}
const basicGet = {
	method: "GET",
	headers,
}

export function listRepoFromCurrentUser(): Promise<GithubRepo[]> {
	return fetch(`${baseUrl}/user/repos?per_page=100&sort=pushed`, basicGet).then((res) => res.json())
}

export function listStarredRepos(): Promise<GithubRepo[]> {
	return fetch(`${baseUrl}/user/starred?per_page=100&sort=created`, basicGet).then((res) => res.json())
}

export function getLastCommitFromRepo(username: string, repoName: string): Promise<GithubCommit> {
	return fetch(`${baseUrl}/repos/${username}/${repoName}/commits?per_page=1`, basicGet)
		.then((res) => res.json())
		.then((commits) => commits[0])
}

export function getFiles(username: string, repoName: string, path: string): Promise<GithubContent[]> {
	return fetch(`${baseUrl}/repos/${username}/${repoName}/contents/${path}`, basicGet).then((res) => res.json())
}
