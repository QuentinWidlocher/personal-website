import { Outlet, LinksFunction, Link, HeadersFunction } from "remix"
import blogCss from "@blog/styles/blog.css"
import { ArrowLeft } from "iconoir-react"

const proseConfig = `
prose-a:no-underline prose-a:underline-offset-4 hover:prose-a:underline 
prose-blockquote:border-slate-300 prose-blockquote:text-slate-300
prose-pre:rounded-xl prose-pre:bg-slate-900/30 prose-pre:p-5 prose-pre:leading-snug lg:prose-pre:-mx-12 xl:prose-pre:-mx-24
prose-hr:border-slate-500/20 prose-hr:border-2
md:prose-h1:text-center md:prose-h1:-mx-5 lg:prose-h1:-mx-12 xl:prose-h1:-mx-24
`

export let headers: HeadersFunction = () => ({
	// Cache for 1h, revalidate for 1d
	"Cache-Control": "max-age=3600, stale-while-revalidate=86400",
})

export let links: LinksFunction = () => [{ href: blogCss, rel: "stylesheet" }]

export default function ArticleLayoutRoute() {
	return (
		<>
			<nav className="absolute top-20 hidden rounded-r bg-slate-500/10 p-3 print:!hidden md:block">
				<Link to="/blog" className="text-lg text-slate-300/50" data-tooltip title="Back to the articles">
					<ArrowLeft />
				</Link>
			</nav>
			<div className={"blog container prose prose-invert mx-auto w-full p-5 marker:text-slate-500 selection:bg-slate-500/50 " + proseConfig}>
				<Outlet />
			</div>
		</>
	)
}
