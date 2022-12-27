import { json, LoaderArgs } from "@remix-run/node"
import { getSession, commitSession } from "~/utils/session"
import { getNextTheme } from "~/utils/theme"

export async function action({ request }: LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"))
	const theme = session.get("theme") || "dark"
	session.set("theme", getNextTheme(theme))
	return json(
		{
			theme: session.get("theme"),
		},
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		},
	)
}
