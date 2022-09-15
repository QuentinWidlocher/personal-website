import RepoCard from "../components/repo-card"
import { subMonths, isAfter, isBefore } from "date-fns"
import { Repo } from "../types/repo"
import { Link } from "remix"
import { Plus } from "iconoir-react"

interface ReposPageProps {
	repos: (Repo & { updatedAt: string })[]
	total: number
}

function isBetween(date: Date, start: Date, end: Date): boolean {
	return isAfter(date, start) && isBefore(date, end)
}

export default function ReposPage({ repos, total }: ReposPageProps) {
	let lastMonth = subMonths(new Date(), 1)
	let last3Months = subMonths(new Date(), 3)

	let lastMonthRepos = repos.filter((repo) => isAfter(new Date(repo.updatedAt), lastMonth))
	let last3MonthsRepos = repos.filter((repo) => isBetween(new Date(repo.updatedAt), last3Months, lastMonth))
	let olderRepos = repos.filter((repo) => isBefore(new Date(repo.updatedAt), last3Months))

	return (
		<div className="p-5 text-lg sm:p-10 sm:text-2xl lg:p-16 lg:text-4xl">
			<h1 className="my-5 text-2xl font-bold sm:text-3xl lg:text-5xl">
				<a target="_blank" rel="noopener" className="rounded-xl underline-offset-4 hover:underline" href="https://github.com/QuentinWidlocher?tab=repositories">
					My repositories
				</a>
			</h1>
			<p className="mb-10 text-xl text-slate-600 dark:text-slate-400">Not everything is here, only my main open source projects and courses.</p>
			{lastMonthRepos.length > 0 ? (
				<>
					<h3 className="ml-2 mb-3 text-xl">Worked on recently</h3>
					<ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
						{lastMonthRepos.map((repo) => (
							<li key={repo.id}>
								<RepoCard repo={repo} />
							</li>
						))}
					</ul>
				</>
			) : null}
			{last3MonthsRepos.length > 0 ? (
				<>
					<h3 className="ml-2 mt-5 mb-3 text-xl">Last projects</h3>
					<ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
						{last3MonthsRepos.map((repo) => (
							<li key={repo.id}>
								<RepoCard repo={repo} />
							</li>
						))}
					</ul>
				</>
			) : null}
			{olderRepos.length > 0 ? (
				<>
					<h3 className="ml-2 mt-5 mb-3 text-xl">Older projects</h3>
					<ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
						{olderRepos.map((repo) => (
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
				</>
			) : null}
		</div>
	)
}
