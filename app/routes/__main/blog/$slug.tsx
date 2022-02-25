import blogCss from "@blog/styles/blog.css"
import { HeadersFunction, LinksFunction, LoaderFunction, MetaFunction, useLoaderData } from "remix"
import ArticlePage from "~/features/blog/pages/article.page"
import { Article } from "~/features/blog/types/blog"
import { getBlogArticles } from "~/features/github/api/cached-github.api.server"

export let headers: HeadersFunction = () => ({
	// Cache for 5m, CDN Cache for 5m, revalidate for 1w
	"Cache-Control": `max-age=${60 * 5}, s-maxage=${60 * 5}, stale-while-revalidate=${60 * 60 * 24 * 7}`,
})

export let links: LinksFunction = () => [{ href: blogCss, rel: "stylesheet" }]

export let meta: MetaFunction = ({ data }) => ({
	"title": `${data.title} - Quentin Widlocher`,
	"description": data.subtitle,
	"og:title": `${data.title} - Quentin Widlocher`,
	"og:description": data.subtitle,
})

export let loader: LoaderFunction = async ({ params }) => {
	let articles = await getBlogArticles("notes", "blog")
	let article = articles.find((article) => article.slug === params.slug)

	if (article == null) {
		throw new Error(`Article not found: ${params.slug}`)
	}

	return article
}

export default function ArticleRoute() {
	let article = useLoaderData<Article>()
	return <ArticlePage article={article} />
}
