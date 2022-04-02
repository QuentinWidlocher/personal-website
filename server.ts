import * as dotenv from "dotenv"
dotenv.config()

import express from "express"
import chokidar from "chokidar"
import compression from "compression"
import morgan from "morgan"
import { createRequestHandler } from "@remix-run/express"

import * as serverBuild from "@remix-run/dev/server-build"
import { listRepos, getLastCommit, listStars, getBlogArticles } from "~/features/github/api/cached-github.api.server"

const app = express()

app.use(compression())

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by")

// Remix fingerprints its assets so we can cache forever.
app.use("/build", express.static("public/build", { immutable: true, maxAge: "1y" }))

// Everything else (like favicon.ico) is cached for a day.
app.use("/", express.static("public", { maxAge: "1d" }))

app.use(morgan("tiny"))

app.all(
	"*",
	createRequestHandler({
		build: serverBuild,
		mode: process.env.NODE_ENV,
	}),
)

const port = process.env.PORT ?? 3000

async function run(fetchData = true) {
	return app.listen(port, () => {
		console.log(`Express server listening on port ${port}`)

		if (fetchData) {
			listRepos().then(({ repos }) => {
				repos.forEach((repo) => {
					getLastCommit(repo.name)
				})
			})
			listStars()
			getBlogArticles()
		}
	})
}

async function start() {
	let server = await run()

	chokidar.watch("./").on("change", async (file) => {
		console.log(`${file} changed, restarting server`)
		console.log("--------------------------------------")
		server.close().on("close", async () => {
			try {
				server = await run(false)
			} catch (error) {
				if (isError(error) && error.code != "EADDRINUSE") {
					console.error(error)
				}
			}
		})
	})
}

start()

function isError(error: any): error is NodeJS.ErrnoException {
	return error instanceof Error
}
