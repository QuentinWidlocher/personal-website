import { LoaderFunction, useLoaderData } from "remix"
import BlogListPage from "~/features/blog/pages/list.page"
import { Article } from "~/features/blog/types/blog"

import * as formulairesRemixPt1 from "./articles/les-formulaires-avec-remix-pt-1.mdx"
import * as formulairesRemixPt2 from "./articles/les-formulaires-avec-remix-pt-2.mdx"

export let loader: LoaderFunction = () => {
	console.log("/blog")
	let payload: Article[] = [formulairesRemixPt1, formulairesRemixPt2].map((a) => ({
		title: a.attributes.meta.title,
		subtitle: a.attributes.meta.description,
		slug: a.filename.replace(/\.mdx$/, ""),
	}))

	return payload
}

export default function BlogListRoute() {
	let articles = useLoaderData<Article[]>()
	return <BlogListPage articles={articles} />
}
