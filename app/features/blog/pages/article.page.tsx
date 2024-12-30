import { Link } from "@remix-run/react"
import ArrowLeft from "iconoir-react/dist/ArrowLeft"
import { getMDXComponent } from "mdx-bundler/client/index.js"
import { ReactNode } from "react"
import { useMemo } from "react"
import { Theme } from "~/utils/theme"
import ArticleImage from "../components/article-image"
import Mermaid, { MermaidConfig } from "../components/mermaid"
import Tabs from "../components/tabs"
import { Article } from "../types/blog"

interface ArticlePageProps {
  article: Omit<Article, "createdAt">
  theme?: Theme
}

const proseConfig = `
prose-lg
prose-a:underline-offset-4
prose-blockquote:border-slate-500 prose-blockquote:text-slate-500 dark:prose-blockquote:border-slate-500 dark:prose-blockquote:text-slate-300
prose-pre:text-lg prose-pre:rounded-xl prose-pre:bg-slate-100/30 dark:prose-pre:bg-slate-900/30 prose-pre:p-5 prose-pre:leading-snug prose-pre:-mx-5 lg:prose-pre:-mx-12 xl:prose-pre:-mx-24
prose-hr:border-slate-500/20 prose-hr:border-t-4
md:prose-h1:text-center md:prose-h1:-mx-5 lg:prose-h1:-mx-12 xl:prose-h1:-mx-24
`

export default function ArticlePage({ article, theme }: ArticlePageProps) {
  const Component = useMemo(() => getMDXComponent(article.content), [article.content])
  let Config: ({ children, theme }: { children?: ReactNode; theme?: Theme }) => JSX.Element = ({ children }) => <>{children}</>

  if (article.withMermaid) {
    Config = ({ children }: { children?: ReactNode }) => MermaidConfig({ children, theme })
  }

  return (
    <>
      <nav className="absolute top-[33vh] mt-5 hidden rounded-r bg-sky-800/20 dark:bg-slate-500/10 p-3 print:!hidden md:block">
        <Link to="/blog" className="text-lg text-slate-100 dark:text-slate-300/50" data-tooltip title="Back to the articles">
          <ArrowLeft />
        </Link>
      </nav>
      <ArticleImage article={article} className="h-[33vh] w-full object-cover shadow-xl" />
      <div className={"blog container prose dark:prose-invert mx-auto my-10 w-full p-5 marker:text-slate-500 selection:bg-slate-500/50 " + proseConfig}>
        <article>
          <h1 id="#">{article.title}</h1>
          <blockquote>{article.subtitle}</blockquote>
          <Config>
            <Component components={{ Tabs, Mermaid }} />
          </Config>
        </article>
      </div>
    </>
  )
}
