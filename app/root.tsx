import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "remix";
import type { MetaFunction } from "remix";
import cssuiCore from "css-ui-lib/cssui.css";
import cssuiTooltip from "css-ui-lib/tooltip/tooltip.css";

export const meta: MetaFunction = () => {
  return { title: "Quentin Widlocher" };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: cssuiCore },
    { rel: "stylesheet", href: cssuiTooltip },
    { rel: "stylesheet", href: "/tailwindcss" },
  ];
};

export default function App() {
  const matches = useMatches();

  // If at least one route wants to hydrate, this will return true
  const includeScripts = matches.some((match) => match.handle?.hydrate);

  return (
    <html className="h-full" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#0EA5E9" />
        <meta name="description" content="Put your description here." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Lazard_" />
        <meta name="twitter:title" content="Quentin Widlocher" />
        <meta
          name="twitter:description"
          content="🇫🇷 French web developer, amateur game developer and a learning enthusiast !"
        />
        <meta
          name="twitter:image"
          content="https://quentin.widlocher.com/assets/images/gradient-background.webp"
        />
        <meta property="og:title" content="Quentin Widlocher" />
        <meta
          property="og:description"
          content="French web developer, amateur game developer and a learning enthusiast !"
        />
        <meta property="og:url" content="https://quentin.widlocher.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://quentin.widlocher.com/assets/images/gradient-background.webp"
        />
        <meta property="og:image:alt" content="Quentin Widlocher" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Quentin Widlocher" />
        <meta name="robots" content="index,follow" />
        <Meta />
        <Links />
        <link rel="canonical" href="https://quentin.widlocher.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="assets/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="assets/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="assets/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        {includeScripts ? <Scripts /> : null}
        <script src="/sw_launcher.js" />
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
