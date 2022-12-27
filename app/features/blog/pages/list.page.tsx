import { Serialized } from "~/utils/types"
import ArticleCard from "../components/article-card"
import { Article } from "../types/blog"

interface BlogListPageProps {
	articleGroups: GroupedArticles
}

export interface GroupedArticles {
	other: Serialized<Article>[]
	[k: string]: Serialized<Article>[]
}

function getLastArticle(max: number, article: Serialized<Article>) {
	return Math.max(max, article.createdAt ? new Date(article.createdAt).getTime() : 0)
}

function sortByDate(a: Serialized<Article>, b: Serialized<Article>) {
	if (a.createdAt && b.createdAt) {
		if (a.series == "other") {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		} else {
			return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		}
	} else {
		return 0
	}
}

export default function BlogListPage({ articleGroups }: BlogListPageProps) {
	let groupNames = Object.keys(articleGroups ?? {}).sort((a, b) => {
		// Others are always at the end
		if (a === "other") return -1
		if (b === "other") return 1

		let groupA = articleGroups[a]
		let groupB = articleGroups[b]

		let lastUpdatedInA = groupA.reduce(getLastArticle, 0)
		let lastUpdatedInB = groupB.reduce(getLastArticle, 0)

		return lastUpdatedInB - lastUpdatedInA
	})

	return (
		<div className="p-5 text-lg not-prose sm:p-10 sm:text-2xl lg:p-16 lg:text-4xl">
			<h1 className="my-5 text-2xl font-bold sm:text-3xl lg:text-5xl">
				My blog articles <span className="align-middle">📰</span>
			</h1>
			<h2 className="mb-10 text-xl text-slate-600 dark:text-slate-400">Here you can find the things I write.</h2>
			{groupNames.map((groupName) => (
				<>
					<h2 className="mb-5">{groupName == "other" ? "Others" : groupName}</h2>
					<ul className="grid grid-cols-1 gap-5 mb-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
						{articleGroups[groupName].sort(sortByDate).map((article) => (
							<li key={article.slug}>
								<ArticleCard article={{ ...article, createdAt: article.createdAt ? new Date(article.createdAt) : undefined }} />
							</li>
						))}
					</ul>
				</>
			))}
		</div>
	)
}
