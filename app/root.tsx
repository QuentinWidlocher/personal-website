import {
	Links,
	LinksFunction,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useMatches,
} from "remix";
import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
	return { title: "Quentin Widlocher" };
};

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: "/tailwindcss" }];
};

export default function App() {
	const matches = useMatches();

	// If at least one route wants to hydrate, this will return true
	const includeScripts = matches.some((match) => match.handle?.hydrate);

	return (
		<html className="h-full" lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="h-full">
				<Outlet />
				<ScrollRestoration />
				{includeScripts ? <Scripts /> : null}
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
}
export function CatchBoundary() {
	return (
		<html>
			<head>
				<title>Oops</title>
				<Meta />
				<Links />
			</head>
			<body>
				<div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-800">
					<h1 className="text-4xl text-white">
						Oops, this is still WIP sorry 🚧
					</h1>
				</div>
				<Scripts />
			</body>
		</html>
	);
}
