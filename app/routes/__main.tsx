import { Outlet } from "remix"
import NavBar from "~/components/navbar"

export default function Index() {
	return (
		<>
			<main className="grid h-full grid-cols-[auto_1fr] overflow-hidden text-black dark:text-white print:!grid-cols-1 print:!overflow-auto lg:grid-cols-[20rem_1fr]">
				<NavBar />
				<section tabIndex={-1} className="overflow-y-auto bg-gray-50/60 dark:bg-gray-900/80 print:overflow-y-visible ">
					<Outlet />
				</section>
			</main>
			<div className="fixed top-0 -z-10 min-h-screen w-screen bg-blue-500 bg-[url('/assets/images/gradient-background.webp')] bg-cover bg-center backdrop-blur-3xl"></div>
		</>
	)
}
