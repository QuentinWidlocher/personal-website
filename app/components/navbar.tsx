import { Link, NavLink, useFetcher, useMatches } from "remix"
import { GitHub, Telegram, Twitter, Medium, Home, GitBranch, StarOutline, JournalPage, ShortPants } from "iconoir-react"
import { version } from "../../package.json"
import { useEffect } from "react"

interface NavBarProps {}

function getNavLinkStyle({ isActive }: { isActive: boolean }) {
	let baseStyle = `navbar-link flex space-x-5 w-full py-2 sm:py-4 px-2 sm:px-5 rounded-l-xl hover:bg-slate-500/10 transition-colors border-r-2 after:inline-block before:inline-block lg:after:!hidden lg:before:!hidden`
	if (isActive) {
		return `${baseStyle} font-bold border-white active`
	} else {
		return `${baseStyle} text-slate-400 hover:text-white border-transparent`
	}
}

const navLinks: { href: string; label: string; icon: JSX.Element }[] = [
	{ href: "/", label: "About me", icon: <Home /> },
	{ href: "/repos", label: "My repositories", icon: <GitBranch /> },
	{ href: "/stars", label: "My starred repos", icon: <StarOutline /> },
	{ href: "/blog", label: "My articles", icon: <JournalPage /> },
]

export default function NavBar({}: NavBarProps) {
	let matches = useMatches()
	let fetcher = useFetcher()

	// On each route change, fetch the new stars count
	useEffect(() => {
		if (fetcher.type === "init" || fetcher.type === "done") {
			fetcher.load("/new-stars")
		}
	}, [matches])

	return (
		<nav className="sticky top-0 -my-5 flex w-full justify-center bg-slate-800/80 py-10 text-white shadow-lg shadow-slate-800/20 print:hidden sm:shadow-xl sm:shadow-slate-800/30 lg:shadow-2xl lg:shadow-slate-800/50 landscape:my-0 landscape:py-0 landscape:md:-my-5 landscape:md:py-10">
			<ul className="flex h-full w-full flex-col">
				<li className="flex flex-col items-center space-x-0 p-2 pb-10 sm:flex-row sm:space-x-5 sm:p-5 landscape:hidden landscape:md:flex">
					<Link className="-m-1 rounded-full p-1" to="/" prefetch="intent">
						<img src="/assets/images/profil.webp" alt="A simplistic rendition of Quentin's face" className="mb-5 aspect-square h-8 w-8 rounded-full sm:mb-0 sm:h-16 sm:w-16" />
					</Link>
					<section className="flex flex-col space-y-2">
						<Link to="/" prefetch="intent" className="hidden rounded lg:block">
							<h1 className="text-lg font-bold underline-offset-4 hover:underline">Quentin Widlocher</h1>
						</Link>
						<div className="flex flex-col justify-around space-y-3 lg:flex-row lg:space-y-0">
							<a
								title="My Github page"
								aria-label="Link to my Github page"
								href="https://github.com/QuentinWidlocher"
								target="_blank"
								rel="noopener"
								data-tooltip
								role="tooltip"
								className="navbar-link rounded p-1 text-slate-400 transition-colors hover:text-white"
							>
								<GitHub />
							</a>
							<a
								title="My Telegram channel"
								aria-label="Link to my Telegram channel"
								href="https://t.me/lazard_channel"
								target="_blank"
								rel="noopener"
								data-tooltip
								role="tooltip"
								className="navbar-link rounded p-1 text-slate-400 transition-colors hover:text-blue-500"
							>
								<Telegram />
							</a>
							<a
								title="My Twitter account"
								aria-label="Link to my Twitter account"
								href="https://twitter.com/Lazard_"
								target="_blank"
								rel="noopener"
								data-tooltip
								role="tooltip"
								className="navbar-link rounded p-1 text-slate-400 transition-colors  hover:text-sky-500"
							>
								<Twitter />
							</a>
							<a
								title="My Medium page"
								aria-label="Link to my Medium page"
								href="https://medium.com/@QuentinWidlocher"
								target="_blank"
								rel="noopener"
								data-tooltip
								role="tooltip"
								className="navbar-link rounded p-1 text-slate-400 transition-colors  hover:text-green-500"
							>
								<Medium />
							</a>
						</div>
					</section>
				</li>

				<ul className="my-auto flex flex-col space-y-5">
					{navLinks.map(({ href, label, icon }) => (
						<li className="ml-auto sm:mt-5 lg:ml-5" key={href}>
							<NavLink prefetch="intent" to={href} className={getNavLinkStyle} aria-label={label} title={label} data-tooltip role="tooltip">
								{icon}
								<span className="hidden lg:block">{label}</span>
								{href === "/stars" && fetcher.data != null ? <span className="aspect-square rounded-full bg-sky-500 px-2 text-sm font-bold text-sky-800">{fetcher.data}</span> : null}
							</NavLink>
						</li>
					))}
				</ul>

				<li className="mt-auto mb-5 hidden text-center text-slate-400 underline-offset-4 hover:underline lg:block">
					<a data-tooltip role="tooltip" title={`Version ${version}`} href="https://github.com/QuentinWidlocher/personal-website" target="_blank" rel="noopener" className="rounded p-1">
						See this website on github
					</a>
				</li>
			</ul>
		</nav>
	)
}
