import { HeadersFunction, useLoaderData } from "remix"
import { ArticleListLoaderPayload } from "~/features/blog/loaders/article-list.loader"
import BlogListPage from "~/features/blog/pages/list.page"

export { loader } from "~/features/blog/loaders/article-list.loader"

export let headers: HeadersFunction = () => ({
	// Cache for 5m, CDN Cache for 1h, revalidate for 1d
	"Cache-Control": `max-age=${60 * 5}, s-maxage=${60 * 60}, stale-while-revalidate=${60 * 60 * 24}`,
})

export default function BlogListRoute() {
	let { groups } = useLoaderData<ArticleListLoaderPayload>()
	return <BlogListPage articleGroups={groups} />
}
