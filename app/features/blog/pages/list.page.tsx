import { Link } from "remix"
import { Article } from "../types/blog"

interface BlogListPageProps {
	articles: Article[]
}

export default function BlogListPage({ articles }: BlogListPageProps) {
	return (
		<div>
			<h1>Blog</h1>
			<ul>
				{articles.map((article) => (
					<li key={article.slug}>
						<Link to={`/blog/${article.slug}`}>
							<a>{article.title}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
