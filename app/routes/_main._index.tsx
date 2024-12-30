import { HeadersFunction } from "@remix-run/node"
import { Link } from "@remix-run/react"
import GitBranch from "iconoir-react/dist/GitBranch"
import PageStar from "iconoir-react/dist/PageStar"
import { useState } from "react"

export let headers: HeadersFunction = () => ({
  // Cache for 1h CDN Cache for 1h, revalidate for 1w
  "Cache-Control": `max-age=${60 * 60}, s-maxage=${60 * 60}, stale-while-revalidate=${60 * 60 * 24 * 7}`,
})

export default function IndexRoute() {
  let [cheatCodeClick, setCheatCodeClick] = useState(1)
  let incrementCheatCode = () => setCheatCodeClick((i) => i + 1)
  let cheatCodeValidated = () => cheatCodeClick > 5

  if (cheatCodeClick == 6) {
    sa_event("cheatcode")
  }

  return (
    <div className="p-5 text-lg sm:p-10 sm:text-xl lg:p-20 lg:text-2xl">
      <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-x-5 md:space-x-10">
        <img
          src={cheatCodeValidated() ? "/assets/images/secret.jpg" : "/assets/images/profil-lg.webp"}
          alt={"A photo of Quentin's face" + (cheatCodeValidated() ? " with an ugly moustache" : "")}
          className="object-cover w-64 h-64 rounded-full aspect-square"
        />
        <div className="dark:text-white">
          <h2 className="text-2xl leading-relaxed sm:text-3xl lg:text-5xl">Hi there !</h2>
          <h3 className="text-2xl leading-relaxed sm:text-4xl lg:text-6xl">
            I'm <strong>{cheatCodeValidated() ? "Kant1 Wildocher" : "Quentin Widlocher"}</strong>
          </h3>
        </div>
      </div>

      <article className="mt-10 leading-relaxed text-slate-600 dark:text-slate-300 lg:mt-20 xl:w-2/3">
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
          <Link role="tooltip" data-tooltip title="See my starred repos" to="/stars" className="p-1 -m-1 font-semibold text-black rounded dark:text-white underline-offset-4 hover:underline">
            learn new things all the time
          </Link>{" "}
          and I also happen to{" "}
          <Link data-tooltip title="Read my articles" to="/blog" prefetch="intent" className="p-1 -m-1 font-semibold text-black rounded dark:text-white underline-offset-4 hover:underline">
            teach some people too
          </Link>
          .
        </p>
        <br />
        <p>I really love the web, UI & UX design and video games.</p>
        <br />
        <div className="flex flex-col my-10 space-y-10 text-xl text-white lg:-mr-10 md:flex-row md:space-y-0 md:space-x-5">
          <Link
            to="/repos"
            prefetch="intent"
            className="flex px-5 py-4 space-x-5 text-lg transition-transform transform rounded-lg bg-slate-500/20 hover:bg-gradient-to-tr hover:from-sky-500/50 hover:to-sky-400/60 hover:shadow-lg hover:shadow-sky-500/20 active:translate-y-px"
          >
            <GitBranch /> <span>See my work</span>
          </Link>
          {/* <Link */}
          {/*   to="/blog" */}
          {/*   prefetch="intent" */}
          {/*   className="flex px-5 py-4 space-x-5 text-lg transition-transform transform rounded-lg bg-slate-500/20 hover:bg-gradient-to-tr hover:from-sky-500/50 hover:to-sky-400/60 hover:shadow-lg hover:shadow-sky-500/20 active:translate-y-px" */}
          {/* > */}
          {/*   <JournalPage /> */}
          {/*   <span>Read my articles</span> */}
          {/* </Link> */}
          <a
            href="/resume"
            target="_blank"
            className="flex px-5 py-4 space-x-5 text-lg transition-transform transform rounded-lg bg-slate-500/20 hover:bg-gradient-to-tr hover:from-sky-500/50 hover:to-sky-400/60 hover:shadow-lg hover:shadow-sky-500/20 active:translate-y-px"
          >
            <PageStar />
            <span>See my resume</span>
          </a>
        </div>
      </article>
    </div>
  )
}
