import { Article } from "../types/blog"
import { Link } from "remix"
import Card from "~/components/card"
import ArticleImage from "./article-image"

interface RepoCardProps {
	article: Article
}

export default function ArticleCard({ article }: RepoCardProps) {
	return (
		<Link className="block h-full rounded-lg text-base" to={`/blog/${article.slug}`}>
			<Card
				imgSlot={<ArticleImage article={article} srcSetMode="card" className="w-full" />}
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
