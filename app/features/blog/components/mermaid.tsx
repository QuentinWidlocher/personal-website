import mermaid from "mermaid"
import mermaidAPI from "mermaid/mermaidAPI"
import React from "react"
import { useEffect, useId, useRef, useState } from "react"
import { Theme, useColorScheme } from "~/utils/theme"

type MermaidProps = {
	graph: string
	name?: string
}

export function MermaidConfig({ children, theme }: { children?: React.ReactNode; theme?: Theme }) {
	const colorScheme = useColorScheme(theme)
	const dark = colorScheme == "dark"

	mermaid.initialize({
		startOnLoad: false,
		theme: "base" as mermaidAPI.Theme,
		themeVariables: {
			darkMode: dark,
			primaryColor: dark ? "#475569" : "#e2e8f0",
			primaryBorderColor: dark ? "#475569" : "#e2e8f0",
			noteBkgColor: dark ? "#0ea5e944" : "#0ea5e944",
			noteTextColor: dark ? "#0ea5e9" : "#0284c7",
			noteBorderColor: dark ? "#00000000" : "#00000000",
			secondaryColor: dark ? "#0ea5e9" : "#0ea5e9",
		},
	})

	return <React.Fragment key={colorScheme as string}>{children ?? null}</React.Fragment>
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
