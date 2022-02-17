import { Link } from "remix";
import { GitBranch } from "iconoir-react";

export default function HomePage() {
	return (
		<div className="p-5 text-lg sm:p-10 sm:text-xl lg:p-20 lg:text-2xl">
			<h2 className="text-2xl leading-relaxed sm:text-3xl lg:text-5xl">
				Hi there !
			</h2>
			<h3 className="text-2xl leading-relaxed sm:text-4xl lg:text-6xl">
				I'm <strong>Quentin Widlocher</strong>
			</h3>

			<article className="mt-10 leading-relaxed text-slate-300 lg:mt-20">
				<p>
					I'm a web developper, an amateur game developper and a learning
					enthusiast !
				</p>
				<br />
				<p>
					I'm very passionate about development and especially open source.
					<br /> I love to{" "}
					<Link
						to="/stars"
						className="font-semibold text-white underline-offset-4 hover:underline"
					>
						{" "}
						learn new things all the time{" "}
					</Link>
					and I also happen to{" "}
					<Link
						to="/blog"
						className="font-semibold text-white underline-offset-4 hover:underline"
					>
						{" "}
						teach some people too
					</Link>
					.
				</p>
				<br />
				<p>I really love the web, UI & UX design and video games.</p>
				<div className="mt-20 flex flex-col text-xl text-white sm:flex-row">
					<Link
						to="/repos"
						className="flex space-x-5 rounded-lg bg-slate-500/20 py-4 px-5 text-lg hover:bg-gradient-to-tr hover:from-sky-500/50 hover:to-sky-400/60 hover:shadow-lg hover:shadow-sky-500/20"
					>
						<GitBranch /> <span>See my work</span>
					</Link>
				</div>
			</article>
		</div>
	);
}
