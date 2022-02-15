import { Outlet } from "remix";
import NavBar from "~/components/navbar";

export default function Index() {
	return (
		<>
			<main className="grid grid-cols-[20rem_1fr] h-screen overflow-hidden text-white">
				<NavBar />
				<section className="bg-gray-900/80 overflow-y-auto">
					<Outlet />
				</section>
			</main>
			<div className="fixed top-0 min-h-screen w-screen -z-10 bg-blue-900 bg-[url('https://www.sliit.lk/wp-content/uploads/2018/02/minimalizm-gradient-background.jpg')]"></div>
		</>
	);
}
