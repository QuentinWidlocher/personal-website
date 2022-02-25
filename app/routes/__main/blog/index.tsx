import { HeadersFunction, LoaderFunction, useLoaderData } from "remix"
import BlogListPage from "~/features/blog/pages/list.page"
import { Article } from "~/features/blog/types/blog"
import { getBlogArticles } from "~/features/github/api/cached-github.api.server"

export let loader: LoaderFunction = async () => {
	return getBlogArticles("notes", "blog")
}

export let headers: HeadersFunction = () => ({
	// Cache for 5m, CDN Cache for 1h, revalidate for 1d
	"Cache-Control": `max-age=${60 * 5}, s-maxage=${60 * 60}, stale-while-revalidate=${60 * 60 * 24}`,
})

export default function BlogListRoute() {
	let articles = useLoaderData<Article[]>()
	return <BlogListPage articles={articles} />
}
