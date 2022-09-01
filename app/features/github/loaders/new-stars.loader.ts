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

	let payload = { newStars: false, newRepos: false }

	if (session.has("starsHash")) {
		let starsHash = session.get("starsHash")

		if (starsHash != githubCache.starsHash?.value) {
			payload.newStars = true
		}
	}

	if (session.has("reposHash")) {
		let reposHash = session.get("reposHash")

		if (reposHash != githubCache.reposHash?.value) {
			payload.newRepos = true
		}
	}

	return payload
}
