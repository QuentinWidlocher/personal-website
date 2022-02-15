import { useLoaderData } from "remix";
import ReposPage from "~/features/github/pages/repos.page";

export { loader } from "~/features/github/loaders/repos.loader";

export default function ReposRoute() {
  let { repos } = useLoaderData();

  return <ReposPage repos={repos} />;
}
