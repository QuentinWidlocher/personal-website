import { createCookieSessionStorage, json, LoaderFunction } from "remix"
import { commitSession, getSession } from "~/utils/session"
import { cache, listStars } from "../api/github.api"
import { Repo } from "../types/repo"

export interface StarsLoaderPayload {
	repos: Repo[]
	total: number
}

export let loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"))

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

	// We update the number of stars "seen" by the user
	session.set("stars", total)
	session.set("starsHash", cache.starsHash)

	return json(payload, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	})
}
