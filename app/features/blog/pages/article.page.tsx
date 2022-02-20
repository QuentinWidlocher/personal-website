import { Article } from "../types/blog"

interface BlogPageProps {
	article: Article
}

export default function BlogPage({ article }: BlogPageProps) {
	return (
		<article>
			<h1>{article.title}</h1>
		</article>
	)
}
