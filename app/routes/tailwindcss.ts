import type { HeadersFunction, LoaderFunction } from "remix"
import { serveTailwindCss } from "remix-tailwind"

export let headers: HeadersFunction = () => ({
	// Cache for 1d CDN Cache for 1w, revalidate for 1w
	"Cache-Control": `max-age=${60 * 60 * 24}, s-maxage=${60 * 60 * 24 * 7}, stale-while-revalidate=${60 * 60 * 24 * 7}`,
})

export const loader: LoaderFunction = () => serveTailwindCss("app/tailwind.css")
