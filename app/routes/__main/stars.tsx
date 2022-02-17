import { MetaFunction } from "@remix-run/react/routeModules";
import { HeadersFunction, useLoaderData } from "remix";
import { StarsLoaderPayload } from "~/features/github/loaders/stars.loader";
import StarsPage from "~/features/github/pages/stars.page";

export { loader } from "~/features/github/loaders/stars.loader";

export let headers: HeadersFunction = () => ({
  // Cache for 30min, revalidate for 30min
  "Cache-Control": "max-age=1800, stale-while-revalidate=1800",
});

export const meta: MetaFunction = () => {
  return { title: "My Stars - Quentin Widlocher" };
};

export default function StarsRoute() {
  let { repos } = useLoaderData<StarsLoaderPayload>();

  return <StarsPage repos={repos} />;
}
