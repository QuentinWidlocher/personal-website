import { Link, NavLink } from "remix";
import {
  GitHub,
  Telegram,
  Twitter,
  Medium,
  Home,
  GitBranch,
  StarOutline,
} from "iconoir-react";

interface NavBarProps {}

function getNavLinkStyle({ isActive }: { isActive: boolean }) {
  let baseStyle = `navbar-link flex space-x-5 w-full py-2 sm:py-4 px-2 sm:px-5 rounded-l-xl hover:bg-white/10 transition-colors border-r-2 after:inline-block before:inline-block lg:after:!hidden lg:before:!hidden`;
  if (isActive) {
    return `${baseStyle} font-bold border-white active`;
  } else {
    return `${baseStyle} text-slate-400 hover:text-white border-transparent`;
  }
}

export default function NavBar({}: NavBarProps) {
  return (
    <nav className="sticky top-0 -my-5 flex w-full justify-center bg-slate-800/80 py-10 text-white shadow-lg shadow-slate-800/20 backdrop-blur-md sm:shadow-xl sm:shadow-slate-800/30 lg:shadow-2xl lg:shadow-slate-800/50">
      <ul className="flex h-full w-full flex-col">
        <li className="flex flex-col items-center space-x-0 p-2 pb-10 sm:flex-row sm:space-x-5 sm:p-5">
          <Link className="-m-1 rounded-full p-1" to="/" prefetch="intent">
            <img
              src="/assets/images/profil.webp"
              alt="A simplistic rendition of Quentin's face"
              className="mb-5 aspect-square h-8 w-8 rounded-full sm:mb-0 sm:h-16 sm:w-16"
            />
          </Link>
          <section className="flex flex-col space-y-2">
            <Link to="/" prefetch="intent" className="hidden rounded lg:block">
              <h1 className="text-lg font-bold underline-offset-4 hover:underline">
                Quentin Widlocher
              </h1>
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
        <li className="ml-auto mt-12 sm:mt-5 lg:ml-5">
          <NavLink
            prefetch="intent"
            to="/"
            className={getNavLinkStyle}
            aria-label="Home"
            title="Home"
            data-tooltip
            role="tooltip"
          >
            <Home />
            <span className="hidden lg:block">Home</span>
          </NavLink>
        </li>
        <li className="ml-auto mt-12 sm:mt-5 lg:ml-5">
          <NavLink
            prefetch="intent"
            to="/repos"
            className={getNavLinkStyle}
            aria-label="My repositories"
            title="My repositories"
            data-tooltip
            role="tooltip"
          >
            <GitBranch />
            <span className="hidden lg:block">My repositories</span>
          </NavLink>
        </li>
        <li className="ml-auto mt-12 sm:mt-5 lg:ml-5">
          <NavLink
            prefetch="intent"
            to="/stars"
            className={getNavLinkStyle}
            aria-label="My stars"
            title="My stars"
            data-tooltip
            role="tooltip"
          >
            <StarOutline />
            <span className="hidden lg:block">My stars</span>
          </NavLink>
        </li>
        <li className="mt-auto mb-5 hidden text-center text-slate-400 underline-offset-4 hover:underline lg:block">
          <a
            href="https://github.com/QuentinWidlocher/personal-website"
            target="_blank"
            rel="noopener"
            className="rounded p-1"
          >
            See this website on github
          </a>
        </li>
      </ul>
    </nav>
  );
}
