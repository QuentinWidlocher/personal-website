import { Outlet } from "remix";
import NavBar from "~/components/navbar";

export default function Index() {
	return (
		<>
			<main className="grid h-full grid-cols-[auto_1fr] overflow-hidden text-white lg:grid-cols-[20rem_1fr]">
				<NavBar />
				<section className="overflow-y-auto bg-gray-900/80">
					<Outlet />
				</section>
			</main>
			<div className="fixed top-0 -z-10 min-h-screen w-screen bg-blue-900 bg-[url('https://www.sliit.lk/wp-content/uploads/2018/02/minimalizm-gradient-background.jpg')]"></div>
		</>
	);
}
