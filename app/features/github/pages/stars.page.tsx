import RepoCard from "../components/repo-card";
import { Repo } from "../types/repo";

interface StarsPageProps {
	repos: Repo[];
}

export default function StarsPage({ repos }: StarsPageProps) {
	return (
		<div className="p-5 text-lg sm:p-10 sm:text-2xl lg:p-16 lg:text-4xl">
			<h1 className="my-5 text-4xl font-bold">
				<a
					target="_blank"
					className="underline-offset-4 hover:underline"
					href="https://github.com/QuentinWidlocher?tab=stars"
				>
					My stars ⭐️
				</a>
			</h1>
			<p className="mb-10 text-xl text-slate-400">
				I spent a lot of my free time, looking around to find cool new stuff to
				try and learn. <br />
				Here is the list of the nice things I've starred on github.
			</p>
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
