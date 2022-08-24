import { Article } from "../types/blog"
import { Link } from "remix"
import Card from "~/components/card"
import ArticleImage from "./article-image"

interface RepoCardProps {
	article: Article
}

export default function ArticleCard({ article }: RepoCardProps) {
	return (
		<Link className="block h-full text-base" to={`/blog/${article.slug}`}>
			<Card
				imgSlot={
					<div className="relative h-full w-full">
						<ArticleImage article={article} srcSetMode="card" className="h-full w-full aspect-[1.5]" />
						<span className="absolute top-0 right-0 m-4 drop-shadow-outline filter">{article.lang == "en" ? "🇺🇸" : "🇫🇷"}</span>
					</div>
				}
				titleSlot={
					<h1 className="text-xl">
						<span className="font-bold">{article.title}</span>
					</h1>
				}
				subTitleSlot={<>{article.subtitle}</>}
			></Card>
		</Link>
	)
}
