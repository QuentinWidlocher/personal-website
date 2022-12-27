import { createCookieSessionStorage } from "@remix-run/node"

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
	cookie: {
		name: "qwidlocher",
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secrets: [process.env.GITHUB_TOKEN!],
		secure: true,
	},
})
