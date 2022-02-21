import { Article } from "../types/blog"
import { Link } from "remix"
import Card from "~/components/card"

interface RepoCardProps {
	article: Article
}

export default function ArticleCard({ article }: RepoCardProps) {
	return (
		<Link className="block h-full rounded-lg text-base" to={`/blog/articles/${article.slug}`}>
			<Card
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
