import { HeadersFunction } from "@remix-run/node"
import HomePage from "~/features/home/pages/home.page"

export let headers: HeadersFunction = () => ({
	// Cache for 1h CDN Cache for 1h, revalidate for 1w
	"Cache-Control": `max-age=${60 * 60}, s-maxage=${60 * 60}, stale-while-revalidate=${60 * 60 * 24 * 7}`,
})

export default function IndexRoute() {
	return <HomePage />
}
