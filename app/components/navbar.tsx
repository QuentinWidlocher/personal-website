import { Link, NavLink } from "remix";

interface NavBarProps {}

function getNavLinkStyle({ isActive }: { isActive: boolean }) {
	let baseStyle = `underline-offset-3 hover:underline`;
	if (isActive) {
		return `${baseStyle} font-bold`;
	} else {
		return baseStyle;
	}
}

export default function NavBar({}: NavBarProps) {
	return (
		<nav className="sticky top-0 flex w-full justify-center bg-black/50 p-5 text-white backdrop-blur-lg">
			<ul className="flex">
				<li>
					<NavLink prefetch="intent" to="/" className={getNavLinkStyle}>
						Home
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
