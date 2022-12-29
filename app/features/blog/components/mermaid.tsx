import mermaid from "mermaid"
import mermaidAPI from "mermaid/mermaidAPI"
import React from "react"
import { useEffect, useId, useRef, useState } from "react"
import { Theme } from "~/utils/theme"

type MermaidProps = {
	graph: string
	name?: string
}

function useColorScheme(storedTheme: Theme = "dark") {
	let [theme, setTheme] = useState<Theme>(storedTheme == "system" ? "dark" : storedTheme)

	console.log("useColorScheme", storedTheme, theme)

	function onPreferenceChange(e: MediaQueryListEvent) {
		console.log("onPreferenceChange", storedTheme, e.matches ? "dark" : "light")
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

	return theme
}

export function MermaidConfig({ children, theme }: { children?: React.ReactNode; theme?: Theme }) {
	const colorScheme = useColorScheme(theme)

	mermaid.initialize({
		startOnLoad: false,
		theme: colorScheme as mermaidAPI.Theme,
	})
	useEffect(() => {}, [colorScheme])

	return <React.Fragment key={colorScheme}>{children ?? null}</React.Fragment>
}

export default function Mermaid({ graph, name }: MermaidProps) {
	const ref = useRef<HTMLDivElement>(null)
	const id = useId()
	let graphName = name || id.replaceAll(":", "")
	let [processed, setProcessed] = useState(false)

	useEffect(() => {
		if (ref.current != null) {
			mermaid.mermaidAPI.render(graphName, graph, (html) => {
				ref.current!.innerHTML = html
				setProcessed(true)
			})
		}
	}, [])

	if (!processed) {
		return <div className="-mx-5 text-transparent rounded-lg lg:-mx-12 xl:-mx-24 bg-slate-500/20 h-80 animate-pulse" ref={ref} />
	} else {
		return <div className="-mx-5 lg:-mx-12 xl:-mx-24" ref={ref} />
	}
}
