import { usePrefersColorScheme } from "@anatoliygatt/use-prefers-color-scheme"
import mermaid from "mermaid"
import mermaidAPI from "mermaid/mermaidAPI"
import React from "react"
import { useEffect, useId, useRef, useState } from "react"

type MermaidProps = {
	graph: string
	name?: string
}

export function MermaidConfig({ children }: { children?: React.ReactNode }) {
	const preferredColorScheme = usePrefersColorScheme()

	console.log("preferredColorScheme", preferredColorScheme)

	mermaid.initialize({
		startOnLoad: false,
		theme: preferredColorScheme as mermaidAPI.Theme,
	})

	return <React.Fragment key={preferredColorScheme}>{children ?? null}</React.Fragment>
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
		return <div className="-mx-5 lg:-mx-12 xl:-mx-24 bg-slate-500/20 h-80 rounded-lg text-transparent animate-pulse" ref={ref} />
	} else {
		return <div className="-mx-5 lg:-mx-12 xl:-mx-24" ref={ref} />
	}
}
