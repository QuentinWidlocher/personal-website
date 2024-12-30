import { json, LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData, useFetcher, Outlet } from "@remix-run/react"
import NavBar from "~/components/navbar"
import { commitSession, getSession } from "~/utils/session"
import { Theme, useColorScheme } from "~/utils/theme"

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))

  let theme: Theme = session.get("theme") || "dark"

  return json(
    {
      theme,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  )
}

export default function Index() {
  let { theme: storedTheme } = useLoaderData<typeof loader>()
  const colorScheme = useColorScheme(storedTheme)
  let fetcher = useFetcher()

  function toggleTheme() {
    fetcher.submit(null, { action: "toggle-theme", method: "post" })
  }

  return (
    <>
      <main className={`${colorScheme} grid h-full grid-cols-[auto_1fr] overflow-hidden text-black dark:text-white print:!grid-cols-1 print:!overflow-auto lg:grid-cols-[20rem_1fr]`}>
        <NavBar theme={storedTheme} toggleTheme={toggleTheme} />
        <section tabIndex={-1} className="overflow-y-auto bg-gray-50/60 dark:bg-gray-900/80 dark:text-slate-100 print:overflow-y-visible ">
          <Outlet />
        </section>
      </main>
      <div className="fixed top-0 -z-10 min-h-screen w-screen bg-blue-500 bg-[url('/assets/images/gradient-background.webp')] bg-cover bg-center backdrop-blur-3xl"></div>
    </>
  )
}
