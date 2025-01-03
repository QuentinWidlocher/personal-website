import { version } from "../../package.json"
import { useEffect } from "react"
import { useMatches, useFetcher, NavLink, Link } from "@remix-run/react"
import { Theme, themeIcons } from "~/utils/theme"
import { loader } from "~/routes/new-stars"
import Home from "iconoir-react/dist/Home"
import GitBranch from "iconoir-react/dist/GitBranch"
import Star from "iconoir-react/dist/Star"
import JournalPage from "iconoir-react/dist/JournalPage"
import GitHub from "iconoir-react/dist/GitHub"
import Linkedin from "iconoir-react/dist/LinkedIn"

interface NavBarProps {
  theme: Theme
  toggleTheme: () => void
}

function getNavLinkStyle({ isActive }: { isActive: boolean }) {
  let baseStyle = `navbar-link relative flex w-full py-2 sm:py-4 px-2 sm:px-5 rounded-l-xl hover:bg-sky-500/10 dark:hover:bg-slate-500/10 transition-colors border-r-2 after:inline-block before:inline-block lg:after:!hidden lg:before:!hidden`
  if (isActive) {
    return `${baseStyle} font-bold text-sky-900 dark:text-white border-slate-800 border-sky-700 dark:border-white bg-sky-500/20 dark:bg-none active`
  } else {
    return `${baseStyle} text-slate-700 dark:text-slate-400 hover:text-sky-900 dark:hover:text-white border-transparent`
  }
}

const navLinks: { href: string; label: string; icon: JSX.Element }[] = [
  { href: "/", label: "About me", icon: <Home /> },
  { href: "/repos", label: "My repositories", icon: <GitBranch /> },
  { href: "/stars", label: "My starred repos", icon: <Star /> },
  { href: "/blog", label: "My articles", icon: <JournalPage /> },
]

export default function NavBar({ theme, toggleTheme }: NavBarProps) {
  let matches = useMatches()
  let fetcher = useFetcher<typeof loader>()

  // On each route change, fetch the new stars count
  useEffect(() => {
    if (fetcher.state == 'idle') {
      fetcher.load("/new-stars")
    }
  }, [matches])

  return (
    <nav className="sticky top-0 flex justify-center w-full py-10 -my-5 shadow-lg bg-slate-300/60 dark:bg-slate-800/80 text-slate-800 dark:text-white shadow-slate-200/20 dark:shadow-slate-800/20 print:hidden sm:shadow-xl sm:shadow-slate-200/30 dark:sm:shadow-slate-800/30 lg:shadow-2xl lg:shadow-slate-200/20 dark:lg:shadow-slate-800/50 landscape:my-0 landscape:py-0 landscape:md:-my-5 landscape:md:py-10">
      <ul className="flex flex-col w-full h-full">
        <li className="flex flex-col items-center p-2 pb-10 space-x-0 lg:mt-10 sm:flex-row sm:space-x-5 sm:p-5 landscape:md:flex">
          <NavLink className={({ isActive }) => (isActive ? "opacity-0 landscape:md:hidden" : "-m-1 rounded-full p-1")} to="/" prefetch="intent">
            <img src="/assets/images/profil-sm.webp" alt="A photo of Quentin's face" className="w-8 h-8 mb-5 rounded-full aspect-square sm:mb-0 sm:h-16 sm:w-16" />
          </NavLink>
          <section className="flex flex-col space-y-2">
            <Link to="/" prefetch="intent" className="hidden rounded lg:block">
              <h1 className="text-lg font-bold underline-offset-4 hover:underline">Quentin Widlocher</h1>
            </Link>
            <div className="flex flex-col space-y-3 text-slate-700 dark:text-slate-400 lg:flex-row lg:space-y-0">
              <a
                title="My GitHub page"
                aria-label="Link to my GitHub page"
                href="https://github.com/QuentinWidlocher"
                target="_blank"
                rel="noopener"
                data-tooltip
                role="tooltip"
                className="p-1 transition-colors rounded navbar-link hover:text-white"
                onClick={() => sa_event("out_github")}
              >
                <GitHub />
              </a>
              {/* <a
                title="My Telegram channel"
                aria-label="Link to my Telegram channel"
                href="https://t.me/QuentinWidlocher"
                target="_blank"
                rel="noopener"
                data-tooltip
                role="tooltip"
                className="p-1 transition-colors rounded navbar-link hover:text-blue-500"
                onClick={() => sa_event("out_telegram")}
              >
                <Telegram />
              </a> */}
              {/* <a
                title="My Twitter account"
                aria-label="Link to my Twitter account"
                href="https://twitter.com/QuentinWdl"
                target="_blank"
                rel="noopener"
                data-tooltip
                role="tooltip"
                className="p-1 transition-colors rounded navbar-link hover:text-sky-500"
                onClick={() => sa_event("out_twitter")}
              >
                <Twitter />
              </a> */}
              <a
                title="My LinkedIn profile"
                aria-label="Link to my LinkedIn profile"
                href="https://www.linkedin.com/in/quentin-widlocher"
                target="_blank"
                rel="noopener"
                data-tooltip
                role="tooltip"
                className="p-1 transition-colors rounded navbar-link hover:text-cyan-500"
                onClick={() => sa_event("out_linkedin")}
              >
                <Linkedin />
              </a>
              <a
                title="My KoFi page"
                aria-label="Link to My KoFi page"
                href="https://ko-fi.com/quentinwidlocher"
                target="_blank"
                rel="noopener"
                data-tooltip
                role="tooltip"
                className="p-1 transition-colors rounded navbar-link hover:text-red-400"
                onClick={() => sa_event("out_kofi")}
              >
                <svg fill="currentColor" width="1.85em" xmlns="http://www.w3.org/2000/svg" viewBox="0 2 24 18">
                  <path d="M2.999 19.5a.803.803 0 0 1-.049-.002c-.948-.094-2.78-.821-2.928-2.909-.059-4.105.019-10.797.02-10.864C.1 5.112.483 4.5 1.193 4.5h17.536c.102.009 4.345.558 5.147 4.608.355 1.794-.063 3.491-1.179 4.779-1.194 1.378-3.066 2.151-5.193 2.161-.119 1.899-1.154 3.099-2.956 3.399C10.925 19.479 3 19.5 3 19.5h-.001zM18.67 5.496 1.193 5.5c-.107 0-.153.281-.154.284.002.02-.075 6.698-.018 10.763.118 1.651 1.783 1.924 2.007 1.953.532-.002 8.019-.022 11.435-.045 1.372-.235 2.089-1.216 2.051-2.907-.003-.139.052-.272.152-.369s.238-.153.375-.141c2.029.1 3.814-.552 4.901-1.805.91-1.05 1.249-2.446.955-3.932-.664-3.344-4.191-3.8-4.227-3.805zM8.785 16.614a.817.817 0 0 1-.36-.084c-.188-.126-.236-.176-.236-.176a36.76 36.76 0 0 0-.663-.592c-1.386-1.224-2.778-2.469-3.248-3.08-.851-1.106-1.111-2.97-.048-4.051.524-.533 1.304-.839 2.178-.826a3.745 3.745 0 0 1 2.363.871c.621-.502 1.95-1.306 3.509-.666.889.366 1.486 1.038 1.683 1.894.219.955-.09 2.047-.807 2.849-1.201 1.34-3.779 3.59-3.888 3.685a.718.718 0 0 1-.483.176zm-.167-.935a.259.259 0 0 0-.018.016l.018-.016zm.266-.043h.01-.01zM4.943 9.332c-.726.737-.393 2.065.127 2.741.451.586 2.186 2.117 3.118 2.94.25.221.457.403.589.523.613-.541 2.649-2.354 3.635-3.452.496-.555.723-1.324.577-1.958-.124-.538-.5-.949-1.088-1.192-1.482-.604-2.752.746-2.764.758-.095.104-.221.183-.368.162a.5.5 0 0 1-.362-.155c-.544-.57-1.256-.887-2.007-.894-.568-.008-1.121.186-1.457.527zm12.748 4.076c-.394 0-.64-.026-.658-.028a.5.5 0 0 1-.445-.497V7.682a.5.5 0 0 1 .5-.5h1.696c.043 0 .087.006.129.017.782.209 2.26 1.083 2.26 2.898 0 1.67-.782 2.76-2.326 3.238a9.234 9.234 0 0 1-1.156.073zm-.103-.998c.273.006.645-.001 1.053-.049 1.033-.329 1.533-1.033 1.533-2.265 0-1.346-1.194-1.824-1.464-1.915h-1.121v4.229z" />
                </svg>
              </a>
            </div>
          </section>
        </li>

        <li className="my-auto">
          <ul className="flex flex-col space-y-5">
            {navLinks.map(({ href, label, icon }) => (
              <li className="ml-auto sm:mt-5 lg:ml-5" key={href}>
                <NavLink prefetch="intent" to={href} className={getNavLinkStyle} aria-label={label} title={label} data-tooltip role="tooltip">
                  {icon}
                  <span className="hidden ml-5 lg:block">{label}</span>
                  {(href === "/stars" && fetcher.data?.newStars) || (href === "/repos" && fetcher.data?.newRepos) ? (
                    <span className="absolute w-2 h-2 rounded-full aspect-square bg-sky-500 left-7 top-1 sm:left-10 sm:top-3"></span>
                  ) : null}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>

        <li className="flex mt-auto mb-5 place-content-around text-slate-400 underline-offset-4">
          <button
            data-tooltip
            role="tooltip"
            title={`${theme[0].toLocaleUpperCase()}${theme.slice(1).toLocaleLowerCase()} theme`}
            type="button"
            className="rounded navbar-link text-slate-700 dark:text-slate-500 hover:text-sky-400 dark:hover:text-sky-500"
            onClick={(e) => {
              toggleTheme()
              e.currentTarget.blur()
            }}
          >
            {themeIcons[theme]}
          </button>
          <a
            data-tooltip
            role="tooltip"
            title={`Version ${version}`}
            href="https://github.com/QuentinWidlocher/personal-website"
            target="_blank"
            rel="noopener"
            className="hidden rounded hover:underline lg:block first:p-1 text-slate-700 dark:text-slate-500"
          >
            See this website on github
          </a>
        </li>
      </ul>
    </nav>
  )
}
