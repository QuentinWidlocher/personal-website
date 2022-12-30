import { HalfMoon, SunLight, BrightnessWindow } from "iconoir-react"
import { useState, useEffect } from "react"

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

/**
 * Get the true color scheme based on a stored one (LocalStorage, Cookie etc.)
 * and the system preference.
 * @param storedTheme may be "dark", "light" or "system", if "system" the system preference will be used
 * @returns "dark" or "light"
 */
export function useColorScheme(storedTheme: Theme = "dark"): Omit<Theme, "system"> {
	let [theme, setTheme] = useState<Theme>(storedTheme == "system" ? "dark" : storedTheme)

	function onPreferenceChange(e: MediaQueryListEvent) {
		if (storedTheme == "system") {
			setTheme(e.matches ? "dark" : "light")
		}
	}

	useEffect(() => {
		let event = window.matchMedia("(prefers-color-scheme: dark)")
		event.addEventListener("change", onPreferenceChange)
		return () => {
			event.removeEventListener("change", onPreferenceChange)
		}
	})

	useEffect(() => {
		if (storedTheme == "system") {
			setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
		} else {
			setTheme(storedTheme)
		}
	}, [storedTheme, theme])

	return theme
}
