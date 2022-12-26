import { json, LoaderArgs } from "@remix-run/server-runtime"
import { useLoaderData, Outlet, useFetcher } from "remix"
import NavBar from "~/components/navbar"
import { commitSession, getSession } from "~/utils/session"

export async function loader({ request }: LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"))

	let theme: "dark" | "light" = session.get("theme") || "dark"

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
	let { theme } = useLoaderData<typeof loader>()
	let fetcher = useFetcher()

	function toggleTheme(theme: "dark" | "light") {
		fetcher.submit(null, { action: "toggle-theme", method: "post" })
	}

	return (
		<>
			<main className={`${theme} grid h-full grid-cols-[auto_1fr] overflow-hidden text-black dark:text-white print:!grid-cols-1 print:!overflow-auto lg:grid-cols-[20rem_1fr]`}>
				<NavBar theme={theme} toggleTheme={toggleTheme} />
				<section tabIndex={-1} className="overflow-y-auto bg-gray-50/60 dark:bg-gray-900/80 print:overflow-y-visible ">
					<Outlet />
				</section>
			</main>
			<div className="fixed top-0 -z-10 min-h-screen w-screen bg-blue-500 bg-[url('/assets/images/gradient-background.webp')] bg-cover bg-center backdrop-blur-3xl"></div>
		</>
	)
}
