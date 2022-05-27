import * as dotenv from "dotenv"
dotenv.config()

import express from "express"
import compression from "compression"
import morgan from "morgan"
import { createRequestHandler } from "@remix-run/express"

import * as serverBuild from "@remix-run/dev/server-build"
import { listRepos, getLastCommit, listStars, getBlogArticles } from "~/features/github/api/cached-github.api.server"

import * as Sentry from "@sentry/node"
import * as Tracing from "@sentry/tracing"

const app = express()

Sentry.init({
	dsn: "https://0b8697b0081945299d63a84ade7d378b@o1264580.ingest.sentry.io/6447672",
	integrations: [
		// enable HTTP calls tracing
		new Sentry.Integrations.Http({ tracing: true }),
		// enable Express.js middleware tracing
		new Tracing.Integrations.Express({ app }),
	],
	tracesSampleRate: 1.0,
})

app.use(compression())

app.use(
	Sentry.Handlers.requestHandler({
		ip: true,
		serverName: false,
		request: true,
	}),
)
app.use(Sentry.Handlers.tracingHandler())

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by")

// Remix fingerprints its assets so we can cache forever.
app.use("/build", express.static("public/build", { immutable: true, maxAge: "1y" }))

// Everything else (like favicon.ico) is cached for a day.
app.use("/", express.static("public", { maxAge: "1d" }))

app.use(
	morgan("tiny", {
		stream: {
			write: (str) => {
				Sentry.captureMessage(str)
			},
		},
		skip: (req) => req.url.includes("new-stars"),
	}),
)

app.use(morgan("dev"))

app.all(
	"*",
	createRequestHandler({
		build: serverBuild,
		mode: process.env.NODE_ENV,
	}),
)

const port = process.env.PORT ?? 3000

app.listen(port, () => {
	console.log(`Express server listening on port ${port}`)

	listRepos().then(({ repos }) => {
		repos.forEach((repo) => {
			getLastCommit(repo.name)
		})
	})
	listStars()
	getBlogArticles()
})
