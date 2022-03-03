import ArticleCard from "../components/article-card"
import { Article } from "../types/blog"

interface BlogListPageProps {
	articleGroups: GroupedArticles
}

export interface GroupedArticles {
	other: Article[]
	[k: string]: Article[]
}

export default function BlogListPage({ articleGroups }: BlogListPageProps) {
	console.debug("articleGroups", articleGroups)
	let groupNames = Object.keys(articleGroups ?? {})

	return (
		<div className="not-prose p-5 text-lg sm:p-10 sm:text-2xl lg:p-16 lg:text-4xl">
			<h1 className="my-5 text-2xl font-bold sm:text-3xl lg:text-5xl">
				My blog articles <span className="align-middle">📰</span>
			</h1>
			<h2 className="mb-10 text-xl text-slate-400">
				Here you can find the things I write. <br /> Almost always going to be in french though.
			</h2>
			{groupNames.map((groupName) => (
				<>
					<h2 className="mb-3">{groupName == "other" ? "Others" : groupName}</h2>
					<ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
						{articleGroups[groupName].map((article) => (
							<li key={article.slug}>
								<ArticleCard article={article} />
							</li>
						))}
					</ul>
				</>
			))}
		</div>
	)
}
