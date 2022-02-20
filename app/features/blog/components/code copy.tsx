import Highlight, { defaultProps, Language } from "prism-react-renderer"
import React, { useCallback, useEffect, useRef, useState } from "react"

type CodeProps = React.PropsWithChildren<{
	lang?: Language
	code?: string
}>

export default function Code({ lang = "tsx", children, code }: CodeProps) {
	let [codeToDisplay, setCodeToDisplay] = useState(code)
	let ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (code == null && ref?.current) {
			setCodeToDisplay(ref.current.innerText)
			console.log("code", codeToDisplay?.trim())
		}
	}, [])

	console.log(ref?.current?.innerText ?? "no code")

	return (
		<>
			<div ref={ref} className="hidden">
				{children}
			</div>
			{codeToDisplay != null ? (
				<Highlight {...defaultProps} theme={undefined} code={codeToDisplay.trim()} language={lang}>
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
			) : (
				<pre>{code}</pre>
			)}
		</>
	)
}
