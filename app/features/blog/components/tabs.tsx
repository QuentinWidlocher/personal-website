import React, { useState } from "react"

interface CodeTabsProps {
	tabs: string[]
}

export default function Tabs({ tabs, children }: React.PropsWithChildren<CodeTabsProps>) {
	let [selectedIndex, setSelectedIndex] = useState(0)

	if (!Array.isArray(children)) {
		children = [children]
	}

	return (
		<div className="rounded-xl">
			<nav className="not-prose">
				<ul className="flex rounded-t-xl bg-slate-900/30">
					{tabs.map((title, index) => (
						<li
							className={`min-w-[5rem] cursor-pointer p-3 first:rounded-tl-xl ${index == selectedIndex ? "bg-sky-500/40 text-sky-200" : "text-slate-500 hover:bg-sky-500/20 hover:text-sky-300"}`}
							onClick={() => setSelectedIndex(index)}
						>
							{title}
						</li>
					))}
				</ul>
			</nav>
			<div className="code-tabs">{(children as any[])[selectedIndex]}</div>
		</div>
	)
}
