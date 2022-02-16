import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "/tailwindcss" }];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
export function CatchBoundary() {
  return (
    <html>
      <head>
        <title>Oops</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-800">
          <h1 className="text-4xl text-white">
            Oops, this is still WIP sorry 🚧
          </h1>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
