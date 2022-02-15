import { NavLink } from "remix";
import { GitHub, Telegram, Twitter, Medium, Home } from 'iconoir-react';

interface NavBarProps {}

function getNavLinkStyle({ isActive }: { isActive: boolean }) {
	let baseStyle = `flex space-x-5 w-full py-4 px-5 pr-0 rounded-l-xl hover:bg-white/10`;
	if (isActive) {
		return `${baseStyle} font-bold border-r-2 border-white`;
	} else {
		return baseStyle;
	}
}

export default function NavBar({}: NavBarProps) {
	return (
		<nav className="sticky top-0 flex -my-5 w-full justify-center bg-slate-800/80 py-10 text-white backdrop-blur-lg shadow-2xl shadow-sky-900/50">
			<ul className="flex flex-col w-full h-full">
				<li className="p-5 pb-10 flex space-x-5 items-center">
					<img 
						src="/assets/images/profil.jpg"
						alt="A simplistic rendition of Quentin's face"
						className="rounded-full aspect-square w-16 h-16"
					/>
					<section className="flex flex-col space-y-2">
						<h1 className="font-bold text-lg">Quentin Widlocher</h1>
						<div className="flex justify-around">
							<a title="My Github" href="https://github.com/QuentinWidlocher" target="_blank" className="text-slate-400 hover:text-white"><GitHub/></a>
							<a title="My Telegram" href="https://t.me/lazard_channel" target="_blank" className="text-slate-400 hover:text-blue-500"><Telegram/></a>
							<a title="My Twitter" href="https://twitter.com/Lazard_" target="_blank" className="text-slate-400  hover:text-sky-500"><Twitter/></a>
							<a title="My Medium" href="https://medium.com/@QuentinWidlocher" target="_blank" className="text-slate-400  hover:text-green-500"><Medium/></a>
						</div>
					</section>
				</li>
				<li className="pl-5 mt-5">
					<NavLink prefetch="intent" to="/" className={getNavLinkStyle}>
						<Home/><span>Home</span>
					</NavLink>
				</li>
				<li className="mt-auto mb-5 text-center text-slate-400 underline-offset-4 hover:underline">
					<a href="https://github.com/QuentinWidlocher/personal-website" target="_blank">See this website on github</a>
				</li>
			</ul>
		</nav>
	);
}
