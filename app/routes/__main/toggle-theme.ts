import { json, LoaderArgs } from "@remix-run/node"
import { getSession, commitSession } from "~/utils/session"

export async function action({ request }: LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"))
	const theme = session.get("theme") || "dark"
	session.set("theme", theme === "dark" ? "light" : "dark")
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
