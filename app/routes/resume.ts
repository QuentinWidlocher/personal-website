import { LoaderFunctionArgs, redirect } from "@remix-run/node"
import { getAcceptablePreferedLangFromHeader } from "~/utils/accept-language"

export async function loader({ request }: LoaderFunctionArgs) {
	let lang = getAcceptablePreferedLangFromHeader(request, "en")

	if (lang == "fr") {
		return redirect("/CV-2022-FR.pdf")
	} else {
		return redirect("/CV-2022-EN.pdf")
	}
}
