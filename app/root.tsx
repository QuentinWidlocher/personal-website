import { Link, Links, LinksFunction, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "remix"
import type { MetaFunction } from "remix"
import cssuiCore from "css-ui-lib/cssui.css"
import cssuiTooltip from "css-ui-lib/tooltip/tooltip.css"
import styleUrl from "./style.css"
import fontsUrl from "./fonts.css"
import React from "react"

export const meta: MetaFunction = () => {
	return {
		"title": "Quentin Widlocher",
		"viewport": "width=device-width, initial-scale=1, shrink-to-fit=no",
		"theme-color": "#0EA5E9",
		"description": "🇫🇷 French web developer, amateur game developer and a learning enthusiast !",
		"twitter:card": "summary_large_image",
		"twitter:site": "@QuentinWdl",
		"twitter:title": "Quentin Widlocher",
		"twitter:description": "🇫🇷 French web developer, amateur game developer and a learning enthusiast !",
		"twitter:image": "https://quentin.widlocher.com/assets/images/profil.webp",
		"mobile-web-app-capable": "yes",
		"apple-mobile-web-app-capable": "yes",
		"application-name": "Quentin Widlocher",
		"apple-mobile-web-app-title": "Quentin Widlocher",
		"apple-mobile-web-app-status-bar-style": "black-translucent",
		"msapplication-navbutton-color": "#50463b",
		"msapplication-TileColor": "#2d89ef",
		"msapplication-config": "/assets/icons/browserconfig.xml",
		"msapplication-starturl": "/",
	}
}

export const links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: cssuiCore },
		{ rel: "stylesheet", href: cssuiTooltip },
		{ rel: "stylesheet", href: fontsUrl },
		{ rel: "stylesheet", href: styleUrl },
		{ rel: "manifest", href: "/manifest.json" },
	]
}

export default function App() {
	return (
		<html className="h-full" lang="en" prefix="og: https://ogp.me/ns#">
			<head>
				<meta charSet="utf-8" />
				<meta property="og:title" content="Quentin Widlocher" />
				<meta property="og:description" content="🇫🇷 French web developer, amateur game developer and a learning enthusiast !" />
				<meta property="og:url" content="https://quentin.widlocher.com" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="https://quentin.widlocher.com/assets/images/gradient-background.webp" />
				<meta property="og:image:alt" content="Quentin Widlocher" />
				<meta property="og:image:width" content="1280" />
				<meta property="og:image:height" content="800" />
				<meta property="og:locale" content="en_US" />
				<meta property="og:site_name" content="Quentin Widlocher" />
				<meta name="robots" content="index,follow" />
				<Meta />
				<Links />
				<link rel="mask-icon" href="/assets/icons/safari-pinned-tab.svg" color="#5bbad5" />
				<link rel="shortcut icon" href="/assets/icons/favicon.ico" />
				<link rel="canonical" href="https://quentin.widlocher.com" />
				<script type="application/ld+json">
					{
						'{"@context":"https://schema.org","@type":"Person","name":"Quentin Widlocher","url":"https://quentin.widlocher.com","sameAs":["https://github.com/QuentinWidlocher","https://twitter.com/QuentinWdl","https://www.linkedin.com/in/quentin-widlocher/", "https://t.me/QuentinWidlocher", "https://medium.com/@QuentinWidlocher", "https://ko-fi.com/quentinwidlocher"]}'
					}
				</script>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
			</head>
			<body className="h-full">
				<Outlet />
				<RouteChangeAnnouncement />
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV != "development" ? (
					<>
						<script async defer src="/sw_launcher.js" />
						<script async defer src="https://sa.quentin.widlocher.com/latest.js"></script>
						<noscript>
							<img src="https://sa.quentin.widlocher.com/noscript.gif" alt="" referrerPolicy="no-referrer-when-downgrade" />
						</noscript>
					</>
				) : (
					<LiveReload />
				)}
			</body>
		</html>
	)
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
					<h1 className="text-4xl text-white">Oops something bad happened 🙊</h1>
					<Link className="text-xl underline text-white mt-5" to="/">
						Go back
					</Link>
				</div>
				<Scripts />
			</body>
		</html>
	)
}

/**
 * Provides an alert for screen reader users when the route changes.
 */
const RouteChangeAnnouncement = React.memo(() => {
	let [hydrated, setHydrated] = React.useState(false)
	let [innerHtml, setInnerHtml] = React.useState("")
	let location = useLocation()

	React.useEffect(() => {
		setHydrated(true)
	}, [])

	let firstRenderRef = React.useRef(true)
	React.useEffect(() => {
		// Skip the first render because we don't want an announcement on the
		// initial page load.
		if (firstRenderRef.current) {
			firstRenderRef.current = false
			return
		}

		let pageTitle = location.pathname === "/" ? "Home page" : document.title
		setInnerHtml(`Navigated to ${pageTitle}`)
	}, [location.pathname])

	// Render nothing on the server. The live region provides no value unless
	// scripts are loaded and the browser takes over normal routing.
	if (!hydrated) {
		return null
	}

	return (
		<div
			aria-live="assertive"
			aria-atomic
			id="route-change-region"
			style={{
				border: "0",
				clipPath: "inset(100%)",
				clip: "rect(0 0 0 0)",
				height: "1px",
				margin: "-1px",
				overflow: "hidden",
				padding: "0",
				position: "absolute",
				width: "1px",
				whiteSpace: "nowrap",
				wordWrap: "normal",
			}}
		>
			{innerHtml}
		</div>
	)
})
