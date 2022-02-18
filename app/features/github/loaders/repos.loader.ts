import { LoaderFunction } from "remix"
import { getLastCommit, listRepos } from "../api/github.api"
import { Repo } from "../types/repo"

export interface ReposLoaderPayload {
	repos: Repo[]
}

export let loader: LoaderFunction = async () => {
	let repos = await listRepos()

	let onlyMainRepos = repos.filter((r) => !r.private && !r.archived && !r.disabled && r.topics?.length > 0)

	let mappedRepos = await Promise.all(
		onlyMainRepos.map(async (repo) => {
			return {
				id: repo.id,
				name: repo.name,
				description: repo.description ?? undefined,
				url: repo.html_url,
				stars: repo.stargazers_count,
				tags: repo.topics ?? [],
				isFork: repo.fork,
				isTemplate: repo.is_template,
				updatedAt: await getLastCommit(repo.name).then((c) => new Date(c.commit.author.date)),
			}
		}),
	)

	let sortedRepos = mappedRepos.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())

	let payload: ReposLoaderPayload = {
		repos: sortedRepos,
	}

	return payload
}
