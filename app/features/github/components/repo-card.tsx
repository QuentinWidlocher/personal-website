import { ReposLoaderPayload } from "../loaders/repos.loader";
import { StarOutline, GitMerge, Map } from "iconoir-react";

interface RepoCardProps {
	repo: ReposLoaderPayload["repos"][number];
}

function getIcon(repo: ReposLoaderPayload["repos"][number]) {
	if (repo.isTemplate) {
		return (
			<div title="This repo is a template">
				<Map />
			</div>
		);
	} else if (repo.isFork) {
		return (
			<div title="This repo is a fork">
				<GitMerge />
			</div>
		);
	} else {
		return null;
	}
}

function titleCase(str: string) {
	return str
		.split(" ")
		.map((word) => word.replace(word[0], word[0].toUpperCase()))
		.join(" ");
}

function formatTitle(title: string) {
	return titleCase(title.replace(/\-/g, " "));
}

// This piece of magical css is used to fade a div in its last 20%
const fadingInlineStyle: React.CSSProperties = {
	WebkitMaskImage:
		"-webkit-gradient(linear, left center, right center, from(rgba(0,0,0,1)), color-stop(0.75, rgba(0,0,0,1)), to(rgba(0,0,0,0)))",
};

export default function RepoCard({ repo }: RepoCardProps) {
	return (
		<a target="_blank" className="block h-full text-base" href={repo.url}>
			<article className="group flex h-full flex-col justify-center rounded-lg bg-slate-500/20 p-5 transition-transform hover:scale-105 hover:bg-gradient-to-tr hover:from-sky-500/50 hover:to-sky-400/60 hover:shadow-lg hover:shadow-sky-500/20 ">
				<div className="mb-2 flex items-center space-x-2">
					{getIcon(repo)}
					<h1 className="text-xl">
						{repo.organization ? (
							<span className="mr-2 text-lg text-slate-400 group-hover:text-sky-200">
								{repo.organization} /
							</span>
						) : null}
						<span className="font-bold">{formatTitle(repo.name)}</span>
					</h1>
				</div>
				<p className="text-slate-400 group-hover:text-sky-200">
					{repo.description}
				</p>
				<div className="flex flex-wrap items-center justify-between">
					{repo.stars > 0 ? (
						<>
							<div className="mt-5 flex space-x-2">
								<StarOutline />
								<span>{repo.stars}</span>
							</div>
							<div className="mx-2" role="separator"></div>
						</>
					) : null}
					<ul
						className="relative mt-5 -mr-5 flex space-x-2 overflow-x-hidden pr-10"
						style={fadingInlineStyle}
					>
						{repo.tags.map((tag) => (
							<li
								key={tag}
								className="whitespace-nowrap rounded border border-slate-500/50 py-1 px-2 text-sm text-slate-400 group-hover:border-sky-500/50 group-hover:text-sky-300"
							>
								{tag}
							</li>
						))}
					</ul>
				</div>
			</article>
		</a>
	);
}
