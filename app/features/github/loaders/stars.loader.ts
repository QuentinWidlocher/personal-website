import { LoaderFunction } from "remix"
import { listStars } from "../api/github.api"
import { Repo } from "../types/repo"

export interface StarsLoaderPayload {
	repos: Repo[]
	total: number
}

export let loader: LoaderFunction = async ({ request }) => {
	let url = new URL(request.url)
	let size = url.searchParams.get("s")
	let sizeNumber = size != null ? parseInt(size) : undefined

	let { stars: repos, total } = await listStars(sizeNumber)

	let mappedRepos: Repo[] = await Promise.all(
		repos.map(async (repo) => {
			return {
				id: repo.id,
				organization: repo.owner.login,
				name: repo.name,
				description: repo.description ?? undefined,
				url: repo.html_url,
				stars: repo.stargazers_count,
				tags: repo.topics ?? [],
				isFork: repo.fork,
				isTemplate: repo.is_template,
				updatedAt: new Date(repo.created_at),
			}
		}),
	)

	let payload: StarsLoaderPayload = {
		repos: mappedRepos,
		total,
	}

	return payload
}
