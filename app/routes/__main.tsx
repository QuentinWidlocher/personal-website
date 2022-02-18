import { Outlet, useLocation, useOutlet } from "remix"
import NavBar from "~/components/navbar"
import { SwitchTransition, CSSTransition, TransitionGroup } from "react-transition-group"
import { useState } from "react"

function StaticOutlet() {
	let [element] = useState(useOutlet())
	return element
}

export default function Index() {
	let location = useLocation()

	return (
		<>
			<main className="grid h-full grid-cols-[auto_1fr] overflow-hidden text-white lg:grid-cols-[20rem_1fr]">
				<NavBar />
				<section tabIndex={-1} className="overflow-y-auto bg-gray-900/80">
					<SwitchTransition mode="out-in">
						<CSSTransition
							key={location.pathname}
							addEndListener={(node, done) => {
								node.addEventListener("animationend", done, false)
							}}
							classNames={{ enterActive: "animate__fadeIn", exitActive: "animate__fadeOut" }}
						>
							<div className="animate__animated animate__faster">
								<span>{location.pathname}</span>
								<StaticOutlet />
							</div>
						</CSSTransition>
					</SwitchTransition>
				</section>
			</main>
			<div className="fixed top-0 -z-10 min-h-screen w-screen bg-blue-900 bg-[url('/assets/images/gradient-background.webp')] bg-cover bg-center backdrop-blur-3xl"></div>
		</>
	)
}
