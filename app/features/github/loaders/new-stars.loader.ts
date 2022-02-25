import { LoaderFunction } from "remix"
import { getSession } from "~/utils/session"
import { githubCache } from "../api/cached-github.api.server"

/**
 * Compare the current stars count with the hash in the session.
 * If the hash is different, the stars have changed.
 * We return the number of new stars.
 */
export let loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"))

	if (session.has("starsHash") && session.has("stars")) {
		let starsHash = await session.get("starsHash")
		let stars = await session.get("stars")

		if (starsHash != githubCache.starsHash && stars < (githubCache.stars?.value?.length ?? 0)) {
			return (githubCache.stars?.value?.length ?? 0) - stars
		}
	}

	return null
}
