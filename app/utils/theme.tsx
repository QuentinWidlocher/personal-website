import { HalfMoon, SunLight, BrightnessWindow } from "iconoir-react"

export const themes = ["light", "dark", "system"] as const

export type Theme = typeof themes[number]

export function getNextTheme(actual: Theme) {
	const index = themes.indexOf(actual)
	const nextIndex = (index + 1) % themes.length
	return themes[nextIndex]
}

export const themeIcons: Record<Theme, JSX.Element> = {
	light: <SunLight />,
	dark: <HalfMoon />,
	system: <BrightnessWindow />,
}
