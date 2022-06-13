import { GithubCommit, GithubContent, GithubRepo } from "../types/github"
import * as Sentry from "@sentry/node"

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
	return fetch(`${baseUrl}/user/repos?per_page=100&sort=pushed`, basicGet)
		.then((res) => res.json())
		.catch(Sentry.captureException)
}

export function listStarredRepos(): Promise<GithubRepo[]> {
	return fetch(`${baseUrl}/user/starred?per_page=100&sort=created`, basicGet)
		.then((res) => res.json())
		.catch(Sentry.captureException)
}

export function getLastCommitFromRepo(repoName: string): Promise<GithubCommit> {
	return fetch(`${baseUrl}/repos/${process.env.GITHUB_USERNAME}/${repoName}/commits?per_page=1`, basicGet)
		.then((res) => res.json())
		.then((commits) => commits[0])
		.catch(Sentry.captureException)
}

export function getFiles(): Promise<GithubContent[]> {
	return fetch(`${baseUrl}/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_ARTICLES_REPO}/contents/${process.env.GITHUB_ARTICLES_PATH}?ref=${process.env.GITHUB_ARTICLES_BRANCH}`, basicGet)
		.then((res) => res.json())
		.catch(Sentry.captureException)
}
