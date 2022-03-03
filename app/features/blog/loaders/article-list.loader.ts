import { LoaderFunction } from "remix"
import { getBlogArticles } from "~/features/github/api/cached-github.api.server"
import { GroupedArticles } from "../pages/list.page"

export interface ArticleListLoaderPayload {
	groups: GroupedArticles
}

export let loader: LoaderFunction = async () => {
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
