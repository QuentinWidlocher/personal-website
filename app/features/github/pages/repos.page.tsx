import RepoCard from "../components/repo-card";
import { ReposLoaderPayload } from "../loaders/repos.loader";

interface ReposPageProps {
	repos: ReposLoaderPayload["repos"];
}

export default function ReposPage({ repos }: ReposPageProps) {
	return (
		<div className="p-5 text-lg sm:p-10 sm:text-2xl lg:p-16 lg:text-4xl">
			<h1 className="my-5 text-4xl font-bold">
				<a
					target="_blank"
					rel="noopener"
					className="underline-offset-4 hover:underline"
					href="https://github.com/QuentinWidlocher?tab=repositories"
				>
					My repositories
				</a>
			</h1>
			<h2 className="mb-10 text-xl text-slate-400">
				Sorted by last updated (not everything is here, only my main work)
			</h2>
			<ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
				{repos.map((repo) => (
					<li key={repo.id}>
						<RepoCard repo={repo} />
					</li>
				))}
			</ul>
		</div>
	);
}
