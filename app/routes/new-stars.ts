import { LoaderFunctionArgs } from "@remix-run/node"
import { githubCache } from "~/features/github/api/cached-github.api.server"
import { getSession } from "~/utils/session"

/**
 * Compare the current stars count with the hash in the session.
 * If the hash is different, the stars have changed.
 * We return the number of new stars.
 */
export async function loader({ request }: LoaderFunctionArgs) {
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

export const shouldRevalidate = () => false
