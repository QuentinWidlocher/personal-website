import { json, LoaderArgs } from "@remix-run/node"
import { commitSession, getSession } from "~/utils/session"
import { getLastCommit, githubCache, listRepos } from "../api/cached-github.api.server"
import { Repo } from "../types/repo"

export interface ReposLoaderPayload {
	repos: Repo[]
	total: number
}

export async function loader({ request }: LoaderArgs) {
	let url = new URL(request.url)
	let size = url.searchParams.get("s")
	let sizeNumber = size != null ? parseInt(size) : undefined

	let { repos, total } = await listRepos(sizeNumber)

	let mappedRepos = await Promise.all(
		repos.map(async (repo) => {
			return {
				id: repo.id,
				name: repo.name,
				description: repo.description ?? undefined,
				url: repo.html_url,
				stars: repo.stargazers_count,
				tags: repo.topics ?? [],
				isFork: repo.fork,
				isTemplate: repo.is_template,
				updatedAt: await getLastCommit(repo.name).then((c) => (console.log(c) || c ? new Date(c.commit.author.date) : new Date())),
			}
		}),
	)

	const session = await getSession(request.headers.get("Cookie"))
	session.set("reposHash", githubCache.reposHash?.value)

	let sortedRepos = mappedRepos.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())

	let payload: ReposLoaderPayload = {
		repos: sortedRepos,
		total,
	}

	return json(payload, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	})
}
