import { Plus } from "iconoir-react"
import { Link } from "remix"
import RepoCard from "../components/repo-card"
import { Repo } from "../types/repo"

interface StarsPageProps {
	repos: Repo[]
	total: number
}

export default function StarsPage({ repos, total }: StarsPageProps) {
	return (
		<div className="p-5 text-lg sm:p-10 sm:text-2xl lg:p-16 lg:text-4xl">
			<h1 className="my-5 text-2xl font-bold sm:text-3xl lg:text-5xl">
				<a target="_blank" rel="noopener" className="rounded-xl underline-offset-4 hover:underline" href="https://github.com/QuentinWidlocher?tab=stars">
					My starred repositories <span className="align-middle">⭐️</span>
				</a>
			</h1>
			<p className="mb-10 text-xl text-slate-400">
				I spent a lot of my free time looking around to find cool new stuff to try and learn. <br /> <br />
				Here you can check out the list of the nice things I've starred on github.
			</p>
			<ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
				{repos.map((repo) => (
					<li key={repo.id}>
						<RepoCard repo={repo} />
					</li>
				))}
				{repos.length < total ? (
					<li className="text-lg">
						<Link
							className="flex h-full min-h-[10rem] items-center justify-center rounded-xl bg-slate-500/10 text-slate-300 backdrop-blur-3xl hover:bg-sky-500/20 hover:text-white"
							to={`?s=${repos.length + 20}`}
						>
							<Plus />
							See more
						</Link>
					</li>
				) : null}
			</ul>
		</div>
	)
}
