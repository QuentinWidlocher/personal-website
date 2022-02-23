import { createCookieSessionStorage } from "remix"

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
	cookie: {
		name: "__session",
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secrets: [process.env.GITHUB_TOKEN!],
		secure: true,
	},
})
