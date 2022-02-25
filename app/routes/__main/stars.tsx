import { MetaFunction } from "@remix-run/react/routeModules"
import { HeadersFunction, useLoaderData } from "remix"
import { StarsLoaderPayload } from "~/features/github/loaders/stars.loader"
import StarsPage from "~/features/github/pages/stars.page"

export { loader } from "~/features/github/loaders/stars.loader"

export let headers: HeadersFunction = () => ({
	// Cache for 5m, CDN Cache for 1h, revalidate for 1d
	"Cache-Control": `max-age=${60 * 5}, s-maxage=${60 * 60}, stale-while-revalidate=${60 * 60 * 24}`,
})

export const meta: MetaFunction = () => {
	return { title: "My Stars - Quentin Widlocher" }
}

export default function StarsRoute() {
	let { repos, total } = useLoaderData<StarsLoaderPayload>()

	return <StarsPage repos={repos} total={total} />
}
