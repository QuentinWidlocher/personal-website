export const availableLocales = ["fr", "en"] as const

export type AvailableLocale = typeof availableLocales[number]

function parseTag(strTag: string) {
	let tag = strTag.split(";")
	const el = {
		value: tag[0].trim(),
		qStr: tag[1],
		q: parseFloat(tag[1]),
		language: "",
		region: "",
	}
	if (!el.value) {
		return
	}

	const lang = el.value.split("-")

	el.language = lang[0]
	el.region = (lang[1] || "").toUpperCase()
	if (!el.qStr) {
		el.q = 1
	} else {
		el.q = parseFloat(el.qStr.slice(2))
		if (isNaN(el.q)) {
			el.q = 1
		}
	}
	return el
}

export function parseAcceptLanguage(acceptLanguage: string) {
	return (acceptLanguage || "")
		.split(",")
		.map(parseTag)
		.filter((x) => x != null && availableLocales.includes(x.value as AvailableLocale))
		.sort((a, b) => b!.q - a!.q)
}

export function getAcceptablePreferedLang(acceptLanguage: string, fallback: AvailableLocale = "fr") {
	return (parseAcceptLanguage(acceptLanguage)[0]?.value as AvailableLocale) ?? fallback
}

export function getAcceptablePreferedLangFromHeader(req: Request, fallback: AvailableLocale = "fr") {
	let acceptLang = req.headers.get("Accept-Language")

	if (!acceptLang) {
		return fallback
	} else {
		return (parseAcceptLanguage(acceptLang)[0]?.value as AvailableLocale) ?? fallback
	}
}
