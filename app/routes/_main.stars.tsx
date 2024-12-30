import { commitSession, getSession } from "~/utils/session"
import { listStars, githubCache } from "~/features/github/api/cached-github.api.server"
import { Repo } from "~/features/github/types/repo"
import { LoaderFunctionArgs, HeadersFunction, MetaFunction, defer } from "@remix-run/node"
import { Await, useLoaderData } from "@remix-run/react"
import { Link } from "@remix-run/react"
import Plus from "iconoir-react/dist/Plus"
import RepoCard from "~/features/github/components/repo-card"
import { Suspense } from "react"

// Cache for 10m, CDN Cache for 1h, revalidate for 1w
const cache = `max-age=${60 * 10}, s-maxage=${60 * 60}, stale-while-revalidate=${60 * 60 * 24 * 7}`

export const headers: HeadersFunction = () => ({
  "Cache-Control": cache,
})

export const meta: MetaFunction = () => [
  { title: "My Stars - Quentin Widlocher" }
]

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))

  let url = new URL(request.url)
  let size = url.searchParams.get("s")
  let sizeNumber = size != null ? parseInt(size) : undefined

  const data = listStars(sizeNumber).then(async ({ repos, total }) => ({
    total,
    repos: await Promise.all(
      repos.map(async (repo) => ({
        id: repo.id,
        organization: repo.owner.login,
        name: repo.name,
        description: repo.description ?? undefined,
        url: repo.html_url,
        stars: repo.stargazers_count,
        tags: repo.topics ?? [],
        isFork: repo.fork,
        isTemplate: repo.is_template,
        updatedAt: new Date(repo.created_at),
      })),
    )
  }))

  // We update the number of stars "seen" by the user
  session.set("starsHash", githubCache.starsHash?.value)

  return defer(
    { data },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
        "Cache-Control": cache,
      },
    },
  )
}

export type RepoLoaderPayload = Awaited<ReturnType<typeof useLoaderData<typeof loader>>['data']>

export default function StarsRoute() {
  let { data } = useLoaderData<typeof loader>()

  return (
    <div className="p-5 text-lg sm:p-10 sm:text-2xl lg:p-16 lg:text-4xl">
      <h1 className="my-5 text-2xl font-bold sm:text-3xl lg:text-5xl">
        <a target="_blank" rel="noopener" className="rounded-xl underline-offset-4 hover:underline" href="https://github.com/QuentinWidlocher?tab=stars">
          My starred repositories <span className="align-middle">⭐️</span>
        </a>
      </h1>
      <p className="mb-10 text-xl text-slate-600 dark:text-slate-400">
        I spent a lot of my free time looking around to find cool new stuff to try and learn. <br /> <br />
        Here you can check out the list of the nice things I've starred on github.
      </p>
      <Suspense fallback={
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {[...Array(20)].map((_, i) => (
            <li className="text-lg" key={i}>
              <div
                className="flex h-[15rem] animate-pulse items-center justify-center rounded-xl dark:bg-slate-500/10 bg-slate-500/20 text-slate-100 dark:text-slate-300 backdrop-blur-3xl hover:bg-sky-500/20 hover:text-white"
              >
              </div>
            </li>

          ))}
        </ul>
      }>
        <Await resolve={data} >
          {({ repos, total }) =>
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {repos.map((repo) => (
                <li key={repo.id}>
                  <RepoCard repo={repo} />
                </li>
              ))}
              {repos.length < total ? (
                <li className="text-lg">
                  <Link
                    className="flex h-full min-h-[10rem] items-center justify-center rounded-xl dark:bg-slate-500/10 bg-slate-500/20 text-slate-100 dark:text-slate-300 backdrop-blur-3xl hover:bg-sky-500/20 hover:text-white"
                    to={`?s=${repos.length + 20}`}
                  >
                    <Plus />
                    See more
                  </Link>
                </li>
              ) : (
                <li className="text-lg">
                  <a
                    target="_blank"
                    href={"https://github.com/QuentinWidlocher?tab=stars"}
                    className="flex h-full min-h-[10rem] items-center justify-center rounded-xl dark:bg-slate-500/10 bg-slate-500/20 text-slate-100 dark:text-slate-300 backdrop-blur-3xl hover:bg-sky-500/20 hover:text-white"
                  >
                    <Plus />
                    See EVEN more on github
                  </a>
                </li>
              )}
            </ul>
          }
        </Await>
      </Suspense>
    </div>
  )
}
