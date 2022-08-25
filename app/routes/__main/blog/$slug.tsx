import blogCss from "@blog/styles/blog.css"
import { HeadersFunction, Link, LinksFunction, LoaderFunction, MetaFunction, useLoaderData } from "remix"
import ArticlePage from "~/features/blog/pages/article.page"
import { Article } from "~/features/blog/types/blog"
import { getBlogArticles } from "~/features/github/api/cached-github.api.server"

export let headers: HeadersFunction = () => ({
	// Cache for 5m, CDN Cache for 5m, revalidate for 1w
	"Cache-Control": `max-age=${60 * 5}, s-maxage=${60 * 5}, stale-while-revalidate=${60 * 60 * 24 * 7}`,
})

export let links: LinksFunction = () => [{ href: blogCss, rel: "stylesheet" }]

export let meta: MetaFunction = ({ data }) => {
	if (data != null) {
		return {
			"title": `${data.title} - Quentin Widlocher`,
			"og:title": `${data.title} - Quentin Widlocher`,
			"twitter:title": `${data.title} - Quentin Widlocher`,

			"description": data.subtitle,
			"og:description": data.subtitle,
			"twitter:description": data.subtitle,

			"og:image": data.cover?.src ? `${data.cover.src}?w=1024&auto=compress&cs=tinysrgb` : undefined,
			"twitter:image": data.cover?.src ? `${data.cover.src}?w=1024&auto=compress&cs=tinysrgb` : undefined,

			"og:image:alt": data.cover?.alt,
		}
	} else {
		return {
			title: "Oops - Quentin Widlocher",
		}
	}
}

export let loader: LoaderFunction = async ({ params }) => {
	let articles = await getBlogArticles()
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

export function ErrorBoundary() {
	return (
		<div className="grid h-full w-full">
			<div className="m-auto flex flex-col">
				<h1 className="text-4xl font-bold">This article does not exists</h1>
				<Link className="mx-auto mt-5 underline underline-offset-4" to="/blog" prefetch="render">
					Go back to the articles
				</Link>
			</div>
		</div>
	)
}
