import { Outlet } from "remix"

export default function BlogLayoutRoute() {
	return (
		<div className="blog container prose prose-invert mx-auto w-full p-5 marker:text-slate-500 selection:bg-slate-500/50 prose-a:underline-offset-4 prose-blockquote:border-slate-300 prose-blockquote:text-slate-300 prose-code:rounded-sm prose-code:bg-slate-500 prose-code:p-0.5 prose-code:font-mono prose-pre:rounded-xl prose-pre:bg-slate-900/30 prose-pre:p-5 prose-pre:leading-snug">
			<Outlet />
		</div>
	)
}
