import { ArrowLeft } from "iconoir-react"
import { getMDXComponent } from "mdx-bundler/client"
import { useMemo } from "react"
import { Link } from "remix"
import Tabs from "../components/tabs"
import { Article } from "../types/blog"

interface ArticlePageProps {
	article: Article
}

const proseConfig = `
prose-lg
prose-a:no-underline prose-a:underline-offset-4 hover:prose-a:underline 
prose-blockquote:border-slate-500 prose-blockquote:text-slate-300
prose-pre:text-lg prose-pre:rounded-xl prose-pre:bg-slate-900/30 prose-pre:p-5 prose-pre:leading-snug prose-pre:-mx-5 lg:prose-pre:-mx-12 xl:prose-pre:-mx-24
prose-hr:border-slate-500/20 prose-hr:border-t-4
md:prose-h1:text-center md:prose-h1:-mx-5 lg:prose-h1:-mx-12 xl:prose-h1:-mx-24
`

export default function ArticlePage({ article }: ArticlePageProps) {
	const Component = useMemo(() => getMDXComponent(article.content), [article.content])

	return (
		<>
			<nav className="absolute top-[33vh] mt-5 hidden rounded-r bg-slate-500/10 p-3 print:!hidden md:block">
				<Link to="/blog" className="text-lg text-slate-300/50" data-tooltip title="Back to the articles">
					<ArrowLeft />
				</Link>
			</nav>
			{article.cover?.src ? (
				<img
					className="h-[33vh] w-full object-cover shadow-xl"
					src={article.cover.src}
					srcSet={`
						${article.cover.src}?w=1440&auto=compress&cs=tinysrgb 1440w,
						${article.cover.src}?w=1920&auto=compress&cs=tinysrgb 1920w,
						${article.cover.src}?w=1536&auto=compress&cs=tinysrgb 1536w,
						${article.cover.src}?w=1280&auto=compress&cs=tinysrgb 1280w,
						${article.cover.src}?w=1024&auto=compress&cs=tinysrgb 1024w,
						${article.cover.src}?w=768&auto=compress&cs=tinysrgb 768w,
						${article.cover.src}?w=640&auto=compress&cs=tinysrgb 640w
					`}
					alt={article.cover.alt ?? "Unrelated image, for decoration purpose"}
				/>
			) : null}
			<div className={"blog container prose prose-invert mx-auto my-10 w-full p-5 marker:text-slate-500 selection:bg-slate-500/50 " + proseConfig}>
				<article>
					<h1 id="#">{article.title}</h1>
					<blockquote>{article.subtitle}</blockquote>
					<Component components={{ Tabs }} />
				</article>
			</div>
		</>
	)
}
