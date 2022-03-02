import { PropsWithChildren } from "react"

interface CardProps {
	titleSlot?: JSX.Element
	subTitleSlot?: JSX.Element
	imgSlot?: JSX.Element
}

export default function Card({ titleSlot, subTitleSlot, children, imgSlot }: PropsWithChildren<CardProps>) {
	return (
		<article className="group flex h-full min-h-[10rem] flex-col justify-center rounded-lg bg-slate-500/20 p-5 transition-transform hover:scale-105 hover:bg-gradient-to-tr hover:from-sky-500/50 hover:to-sky-400/60 hover:shadow-lg hover:shadow-sky-500/20 ">
			{imgSlot ? <div className="-m-5 mb-5 overflow-hidden rounded-t-xl">{imgSlot}</div> : null}
			{titleSlot ? <div className="mb-2 flex items-center space-x-2">{titleSlot}</div> : null}
			{subTitleSlot ? <p className="text-base text-slate-400 group-hover:text-sky-200">{subTitleSlot}</p> : null}
			{children}
		</article>
	)
}
