import { json, LoaderArgs } from "@remix-run/node"
import { useLoaderData, useFetcher, Outlet } from "@remix-run/react"
import { useEffect, useState } from "react"
import NavBar from "~/components/navbar"
import { commitSession, getSession } from "~/utils/session"
import { Theme } from "~/utils/theme"

export async function loader({ request }: LoaderArgs) {
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
	let [theme, setTheme] = useState<Theme>(storedTheme)
	let fetcher = useFetcher()

	function toggleTheme() {
		fetcher.submit(null, { action: "toggle-theme", method: "post" })
	}

	function onPreferenceChange(e: MediaQueryListEvent) {
		if (storedTheme == "system") {
			setTheme(e.matches ? "dark" : "light")
		}
	}

	useEffect(() => {
		let event = window.matchMedia("(prefers-color-scheme: dark)")
		event.addEventListener("change", onPreferenceChange)
		return () => {
			event.removeEventListener("change", onPreferenceChange)
		}
	})

	useEffect(() => {
		if (storedTheme == "system") {
			setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
		} else {
			setTheme(storedTheme)
		}
	}, [storedTheme, theme])

	return (
		<>
			<main className={`${theme} grid h-full grid-cols-[auto_1fr] overflow-hidden text-black dark:text-white print:!grid-cols-1 print:!overflow-auto lg:grid-cols-[20rem_1fr]`}>
				<NavBar theme={storedTheme} toggleTheme={toggleTheme} />
				<section tabIndex={-1} className="overflow-y-auto bg-gray-50/60 dark:bg-gray-900/80 dark:text-slate-100 print:overflow-y-visible ">
					<Outlet />
				</section>
			</main>
			<div className="fixed top-0 -z-10 min-h-screen w-screen bg-blue-500 bg-[url('/assets/images/gradient-background.webp')] bg-cover bg-center backdrop-blur-3xl"></div>
		</>
	)
}
