import "@blog/styles/blog.css"
import { HeadersFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { Link, useLoaderData, useRouteLoaderData } from "@remix-run/react"
import ArticlePage from "~/features/blog/pages/article.page"
import { Article } from "~/features/blog/types/blog"
import { getBlogArticles } from "~/features/github/api/cached-github.api.server"
import { Theme } from "~/utils/theme"

export let headers: HeadersFunction = () => ({
  // Cache for 5m, CDN Cache for 5m, revalidate for 1w
  "Cache-Control": `max-age=${60 * 5}, s-maxage=${60 * 5}, stale-while-revalidate=${60 * 60 * 24 * 7}`,
})

export let meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data != null) {
    return [
      { "title": `${data.title} - Quentin Widlocher` },
      { "og:title": `${data.title} - Quentin Widlocher` },
      { "twitter:title": `${data.title} - Quentin Widlocher` },

      { "description": data.subtitle },
      { "og:description": data.subtitle },
      { "twitter:description": data.subtitle },

      { "og:image": data.cover?.src ? `${data.cover.src}?w=1024&auto=compress&cs=tinysrgb` : undefined },
      { "twitter:image": data.cover?.src ? `${data.cover.src}?w=1024&auto=compress&cs=tinysrgb` : undefined },

      { "og:image:alt": data.cover?.alt },
    ]
  } else {
    return [{ title: "Oops - Quentin Widlocher", }]
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  let articles = await getBlogArticles()
  let article = articles.find((article) => article.slug == params.slug)

  if (article == null) {
    throw new Error(`Article not found: ${params.slug}`)
  }

  return article
}

export default function ArticleRoute() {
  let article = useLoaderData<Article>()
  let themeData = useRouteLoaderData<{ theme: Theme }>("_main")

  return <ArticlePage article={article} theme={themeData?.theme} />
}

export function CatchBoundary(e: any) {
  console.error(e)
  return (
    <div className="grid w-full h-full">
      <div className="flex flex-col m-auto">
        <h1 className="text-4xl font-bold">{e.message}</h1>
        <Link className="mx-auto mt-5 underline underline-offset-4" to="/blog" prefetch="render">
          Go back to the articles
        </Link>
      </div>
    </div>
  )
}

export function ErrorBoundary(e: any) {
  console.error(e)
  return (
    <div className="grid w-full h-full">
      <div className="flex flex-col m-auto">
        <h1 className="text-4xl font-bold">This article does not exists</h1>
        <Link className="mx-auto mt-5 underline underline-offset-4" to="/blog" prefetch="render">
          Go back to the articles
        </Link>
      </div>
    </div>
  )
}
