import { HeadersFunction } from "remix";
import HomePage from "~/features/home/pages/home.page";

export let headers: HeadersFunction = () => ({
	// Cache for 1h, revalidate for 1d
	"Cache-Control": "max-age=3600, stale-while-revalidate=86400",
});

export const handle = { hydrate: false };

export default function IndexRoute() {
	return <HomePage />;
}
