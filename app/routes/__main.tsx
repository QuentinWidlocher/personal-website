import { Outlet } from "remix";
import NavBar from "~/components/navbar";

export default function Index() {
	return (
		<main className="min-h-screen">
			<NavBar />
			<Outlet />
		</main>
	);
}
