import { getBlogArticles } from "~/features/github/api/cached-github.api.server"
import { Article } from "../types/blog"

export interface GroupedArticles {
	other: Article[]
	[k: string]: Article[]
}

export interface ArticleListLoaderPayload {
	groups: GroupedArticles
}

export async function loader() {
	let articles = await getBlogArticles()

	let groups: GroupedArticles = articles.reduce((acc, article) => {
		let series = article.series ?? "other"
		return {
			...acc,
			[series]: [...(acc[series] ?? []), article],
		}
	}, {} as GroupedArticles)

	let payload: ArticleListLoaderPayload = { groups }

	return payload
}
