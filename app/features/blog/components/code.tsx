import Highlight, { defaultProps, Language } from "prism-react-renderer"
import React, { useCallback, useEffect, useRef, useState } from "react"

type CodeProps = React.PropsWithChildren<{
	lang?: Language
	code?: string
}>

function getStringFromChildren(children: React.ReactNode) {
	let currentChildren = children
	// @ts-expect-error
	let currentChildrenClass = currentChildren?.props?.className

	while (currentChildren != null && typeof currentChildren !== "string") {
		// @ts-expect-error
		currentChildrenClass = currentChildren?.props?.className

		// @ts-expect-error idk why this is the only way to get the string
		currentChildren = currentChildren?.props.children
	}

	return { string: currentChildren ?? "", className: currentChildrenClass }
}

export default function Code({ lang, children, code }: CodeProps) {
	let { string, className } = getStringFromChildren(children)
	code ??= string
	lang ??= className?.match(/language-(?<lang>.*)/)?.groups?.lang ?? ""

	return (
		<Highlight {...defaultProps} theme={undefined} code={code?.trim() ?? ""} language={lang ?? "tsx"}>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<pre className={className + " rounded-xl bg-slate-900/30 p-3 backdrop-blur-3xl"} style={style}>
					{tokens.map((line, i) => (
						<div {...getLineProps({ line, key: i })}>
							{line.map((token, key) => (
								<span {...getTokenProps({ token, key })} />
							))}
						</div>
					))}
				</pre>
			)}
		</Highlight>
	)
}
