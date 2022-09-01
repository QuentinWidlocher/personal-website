import { HeadersFunction, LoaderArgs, MetaFunction, useLoaderData } from "remix"
import StarsPage from "~/features/github/pages/stars.page"
import { json } from "remix"
import { commitSession, getSession } from "~/utils/session"
import { listStars, githubCache } from "~/features/github/api/cached-github.api.server"
import { Repo } from "~/features/github/types/repo"

export async function loader({ request }: LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"))

	let url = new URL(request.url)
	let size = url.searchParams.get("s")
	let sizeNumber = size != null ? parseInt(size) : undefined

	let { repos, total } = await listStars(sizeNumber)

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

	// We update the number of stars "seen" by the user
	session.set("starsHash", githubCache.starsHash?.value)
	session.set("reposHash", githubCache.reposHash?.value)

	return json(
		{
			repos: mappedRepos,
			total,
		},
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		},
	)
}

export let headers: HeadersFunction = () => ({
	// Cache for 5m, CDN Cache for 1h, revalidate for 1d
	"Cache-Control": `max-age=${60 * 5}, s-maxage=${60 * 60}, stale-while-revalidate=${60 * 60 * 24}`,
})

export const meta: MetaFunction = () => {
	return { title: "My Stars - Quentin Widlocher" }
}

export default function StarsRoute() {
	let { repos, total } = useLoaderData<typeof loader>()

	return <StarsPage repos={repos} total={total} />
}
