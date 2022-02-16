import { NavLink } from "remix";
import {
  GitHub,
  Telegram,
  Twitter,
  Medium,
  Home,
  GitBranch,
} from "iconoir-react";

interface NavBarProps {}

function getNavLinkStyle({ isActive }: { isActive: boolean }) {
  let baseStyle = `flex space-x-5 w-full py-4 px-5 pr-0 rounded-l-xl hover:bg-white/10`;
  if (isActive) {
    return `${baseStyle} font-bold border-r-2 border-white`;
  } else {
    return `${baseStyle} text-slate-400 hover:text-white`;
  }
}

export default function NavBar({}: NavBarProps) {
  return (
    <nav className="sticky top-0 -my-5 flex w-full justify-center bg-slate-800/80 py-10 text-white shadow-2xl shadow-sky-900/50 backdrop-blur-lg">
      <ul className="flex h-full w-full flex-col">
        <li className="flex items-center space-x-5 p-5 pb-10">
          <img
            src="/assets/images/profil.jpg"
            alt="A simplistic rendition of Quentin's face"
            className="aspect-square h-16 w-16 rounded-full"
          />
          <section className="flex flex-col space-y-2">
            <h1 className="text-lg font-bold">Quentin Widlocher</h1>
            <div className="flex justify-around">
              <a
                title="My Github"
                href="https://github.com/QuentinWidlocher"
                target="_blank"
                className="text-slate-400 hover:text-white"
              >
                <GitHub />
              </a>
              <a
                title="My Telegram"
                href="https://t.me/lazard_channel"
                target="_blank"
                className="text-slate-400 hover:text-blue-500"
              >
                <Telegram />
              </a>
              <a
                title="My Twitter"
                href="https://twitter.com/Lazard_"
                target="_blank"
                className="text-slate-400  hover:text-sky-500"
              >
                <Twitter />
              </a>
              <a
                title="My Medium"
                href="https://medium.com/@QuentinWidlocher"
                target="_blank"
                className="text-slate-400  hover:text-green-500"
              >
                <Medium />
              </a>
            </div>
          </section>
        </li>
        <li className="mt-5 pl-5">
          <NavLink prefetch="intent" to="/" className={getNavLinkStyle}>
            <Home />
            <span>Home</span>
          </NavLink>
        </li>
        <li className="mt-5 pl-5">
          <NavLink prefetch="intent" to="/repos" className={getNavLinkStyle}>
            <GitBranch />
            <span>My repositories</span>
          </NavLink>
        </li>
        <li className="mt-auto mb-5 text-center text-slate-400 underline-offset-4 hover:underline">
          <a
            href="https://github.com/QuentinWidlocher/personal-website"
            target="_blank"
          >
            See this website on github
          </a>
        </li>
      </ul>
    </nav>
  );
}
