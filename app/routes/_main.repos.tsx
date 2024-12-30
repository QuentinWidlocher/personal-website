import { HeadersFunction, MetaFunction, defer } from "@remix-run/node"
import { Await, useLoaderData } from "@remix-run/react"

import { subMonths, isAfter, isBefore } from "date-fns"
import Plus from "iconoir-react/dist/Plus"
import { Link } from "@remix-run/react"
import { json, LoaderFunctionArgs } from "@remix-run/node"
import { commitSession, getSession } from "~/utils/session"
import { githubCache, listRepos, getLastCommit } from "~/features/github/api/cached-github.api.server"
import RepoCard from "~/features/github/components/repo-card"
import { Suspense } from "react"

// Cache for 10m, CDN Cache for 1h, revalidate for 1w
const cache = `max-age=${60 * 10}, s-maxage=${60 * 60}, stale-while-revalidate=${60 * 60 * 24 * 7}`

export const headers: HeadersFunction = () => ({
  "Cache-Control": cache
})

export const meta: MetaFunction = () => [
  { title: "My Repositories - Quentin Widlocher" }
]

export async function loader({ request }: LoaderFunctionArgs) {
  let url = new URL(request.url)
  let size = url.searchParams.get("s")
  let sizeNumber = size != null ? parseInt(size) : undefined

  let lastMonth = subMonths(new Date(), 1)
  let last3Months = subMonths(new Date(), 3)

  let data = listRepos(sizeNumber).then(async ({ repos, total }) => {
    let mappedRepos = await Promise.all(
      repos.map(async (repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description ?? undefined,
        url: repo.html_url,
        stars: repo.stargazers_count,
        tags: repo.topics ?? [],
        isFork: repo.fork,
        isTemplate: repo.is_template,
        updatedAt: await getLastCommit(repo.name).then((c) => (c ? new Date(c.commit.author.date) : new Date())),
      }))
    ).then((repos) => repos.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()));

    return ({
      total,
      repos: mappedRepos,
      lastMonthRepos: mappedRepos.filter((repo) => isAfter(new Date(repo.updatedAt), lastMonth)),
      last3MonthsRepos: mappedRepos.filter((repo) => isBetween(new Date(repo.updatedAt), last3Months, lastMonth)),
      olderRepos: mappedRepos.filter((repo) => isBefore(new Date(repo.updatedAt), last3Months)),
    })
  })

  const session = await getSession(request.headers.get("Cookie"))
  session.set("reposHash", githubCache.reposHash?.value)

  return defer({ data }, {
    headers: {
      "Set-Cookie": await commitSession(session),
      "Cache-Control": cache,
    },
  })
}

function isBetween(date: Date, start: Date, end: Date): boolean {
  return isAfter(date, start) && isBefore(date, end)
}

export default function ReposRoute() {
  let { data } = useLoaderData<typeof loader>()

  return (
    <div className="p-5 text-lg sm:p-10 sm:text-2xl lg:p-16 lg:text-4xl">
      <h1 className="my-5 text-2xl font-bold sm:text-3xl lg:text-5xl">
        <a target="_blank" rel="noopener" className="rounded-xl underline-offset-4 hover:underline" href="https://github.com/QuentinWidlocher?tab=repositories">
          My repositories
        </a>
      </h1>
      <p className="mb-10 text-xl text-slate-600 dark:text-slate-400">Not everything is here, only my main open source projects and courses.</p>
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
          {({ repos, total, lastMonthRepos, last3MonthsRepos, olderRepos }) =>
            <>
              {lastMonthRepos.length > 0 ? (
                <>
                  <h3 className="mb-3 ml-2 text-xl">Worked on recently</h3>
                  <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {lastMonthRepos.map((repo) => (
                      <li key={repo.id}>
                        <RepoCard repo={repo} />
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              {last3MonthsRepos.length > 0 ? (
                <>
                  <h3 className="mt-5 mb-3 ml-2 text-xl">Last projects</h3>
                  <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {last3MonthsRepos.map((repo) => (
                      <li key={repo.id}>
                        <RepoCard repo={repo} />
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              {olderRepos.length > 0 ? (
                <>
                  <h3 className="mt-5 mb-3 ml-2 text-xl">Older projects</h3>
                  <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {olderRepos.map((repo) => (
                      <li key={repo.id}>
                        <RepoCard repo={repo} />
                      </li>
                    ))}
                    {repos.length < total ? (
                      <li className="text-lg">
                        <Link
                          className="flex h-full min-h-[10rem] items-center justify-center rounded-xl bg-slate-500/10 text-slate-300 backdrop-blur-3xl hover:bg-sky-500/20 hover:text-white"
                          to={`?s=${repos.length + 20}`}
                        >
                          <Plus />
                          See more
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                </>
              ) : null}

            </>
          }
        </Await>
      </Suspense>
    </div>
  )
}
