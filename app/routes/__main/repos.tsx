import { MetaFunction } from "@remix-run/react/routeModules"
import { HeadersFunction, useLoaderData } from "remix"
import { ReposLoaderPayload } from "~/features/github/loaders/repos.loader"
import ReposPage from "~/features/github/pages/repos.page"
import { Repo } from "~/features/github/types/repo"

export { loader } from "~/features/github/loaders/repos.loader"

export let headers: HeadersFunction = () => ({
	// Cache for 5m, CDN Cache for 1h, revalidate for 1d
	"Cache-Control": `max-age=${60 * 5}, s-maxage=${60 * 60}, stale-while-revalidate=${60 * 60 * 24}`,
})

export const meta: MetaFunction = () => {
	return { title: "My Repositories - Quentin Widlocher" }
}

export default function ReposRoute() {
	let { repos, total } = useLoaderData<{
		repos: (Repo & { updatedAt: string })[]
		total: number
	}>()

	return <ReposPage repos={repos} total={total} />
}
