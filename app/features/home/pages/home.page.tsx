import { Link } from "remix"
import { GitBranch, JournalPage } from "iconoir-react"
import { useState } from "react"

export default function HomePage() {
	let [cheatCodeClick, setCheatCodeClick] = useState(1)
	let incrementCheatCode = () => setCheatCodeClick((i) => i + 1)
	let cheatCodeValidated = () => cheatCodeClick > 5

	if (cheatCodeClick == 6) {
		sa_event("cheatcode")
	}

	return (
		<div className="p-5 text-lg sm:p-10 sm:text-xl lg:p-20 lg:text-2xl">
			<div className="flex flex-col sm:flex-row items-center sm:space-x-5 md:space-x-10 space-y-5">
				<img
					src={cheatCodeValidated() ? "/assets/images/secret.jpg" : "/assets/images/profil-lg.webp"}
					alt={"A photo of Quentin's face" + (cheatCodeValidated() ? " with an ugly moustache" : "")}
					className="w-64 h-64 aspect-square rounded-full object-cover"
				/>
				<div>
					<h2 className="text-2xl leading-relaxed sm:text-3xl lg:text-5xl">Hi there !</h2>
					<h3 className="text-2xl leading-relaxed sm:text-4xl lg:text-6xl">
						I'm <strong>{cheatCodeValidated() ? "Kant1 Wildocher" : "Quentin Widlocher"}</strong>
					</h3>
				</div>
			</div>

			<article className="mt-10 leading-relaxed text-slate-300 lg:mt-20 xl:w-2/3">
				<p>
					I'm a{" "}
					<button disabled={cheatCodeValidated()} className={cheatCodeValidated() ? "" : "transform active:translate-y-0.5"} onClick={() => incrementCheatCode()}>
						🇫🇷
					</button>{" "}
					french <strong>web developer</strong>, an amateur game developer and a learning enthusiast !
				</p>
				<br />
				<p>
					I'm very passionate about development and especially open source.
					<br /> I'm always working on a new personal projet and I love to{" "}
					<Link role="tooltip" data-tooltip title="See my starred repos" to="/stars" className="-m-1 rounded p-1 font-semibold text-white underline-offset-4 hover:underline">
						learn new things all the time
					</Link>{" "}
					and I also happen to{" "}
					<Link data-tooltip title="Read my articles" to="/blog" prefetch="intent" className="-m-1 rounded p-1 font-semibold text-white underline-offset-4 hover:underline">
						teach some people too
					</Link>
					.
				</p>
				<br />
				<p>I really love the web, UI & UX design and video games.</p>
				<br />
				<p className="border-l-4 pl-4 -ml-4 border-sky-500">
					❗ I'm looking for a <strong>full-remote</strong> job as a web developper (<strong>front-end</strong> if possible) to work on <strong>modern tech stacks</strong> <br />
					(React, Solid, Tailwind, Typescript etc.) <br /> <br />
					Take a look at my resume if you're interested !
				</p>
				<div className="my-10 flex flex-col space-y-10 text-xl text-white sm:flex-row sm:space-y-0 sm:space-x-10">
					<a
						href="/CV-2022-EN.pdf"
						target="_blank"
						className="flex transform space-x-5 rounded-lg bg-slate-500/20 py-4 px-5 text-lg transition-transform hover:bg-gradient-to-tr hover:from-sky-500/50 hover:to-sky-400/60 hover:shadow-lg hover:shadow-sky-500/20 active:translate-y-px"
					>
						<span>🇺🇸 In English</span>
					</a>
					<a
						href="/CV-2022-FR.pdf"
						target="_blank"
						className="flex transform space-x-5 rounded-lg bg-slate-500/20 py-4 px-5 text-lg transition-transform hover:bg-gradient-to-tr hover:from-sky-500/50 hover:to-sky-400/60 hover:shadow-lg hover:shadow-sky-500/20 active:translate-y-px"
					>
						<span>🇫🇷 In French</span>
					</a>
				</div>
			</article>
		</div>
	)
}
