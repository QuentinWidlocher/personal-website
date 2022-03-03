import { bundleMDX } from "mdx-bundler"
import { GithubContent } from "~/features/github/types/github"
import { Article } from "../types/blog"

const remarkPlugins = Promise.all([import("remark-mdx").then((mod) => mod.default), import("remark-gfm").then((mod) => mod.default)])

const rehypePlugins = Promise.all([
	import("rehype-slug").then((mod) => mod.default),
	import("rehype-autolink-headings").then((mod) => mod.default),
	import("rehype-prism-plus").then((mod) => mod.default),
	import("@atomictech/rehype-toc").then((mod) => mod.default),
])

export async function getFullArticle(file: GithubContent): Promise<Article> {
	let content = await fetch(file.download_url).then((res) => res.text())

	let [remarkMdx, remarkGfm] = await remarkPlugins
	let [rehypeSlug, rehypeAutolink, rehypePrismPlus, rehypeToc] = await rehypePlugins

	let mdx = await bundleMDX({
		source: content,
		xdmOptions(options, frontmatter) {
			options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkMdx, remarkGfm]
			options.rehypePlugins = [
				...(options.rehypePlugins ?? []),
				rehypeSlug,
				[rehypeAutolink, { behavior: "wrap" }],
				[rehypePrismPlus, { showLineNumbers: true }],
				[rehypeToc, { headings: ["h2", "h3", "h4"] }],
			]

			return options
		},
	})

	return {
		slug: file.name.replace(/\.mdx?$/, ""),
		title: mdx.frontmatter.title,
		subtitle: mdx.frontmatter.subtitle,
		createdAt: mdx.frontmatter.createdAt ? new Date(mdx.frontmatter.createdAt) : undefined,
		content: mdx.code,
		cover: mdx.frontmatter.cover,
		series: mdx.frontmatter.series,
	}
}
