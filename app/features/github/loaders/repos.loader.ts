import { LoaderFunction } from "remix";
import { listRepos } from "../api/github.api";

export interface ReposLoaderPayload {
  repos: {
    id: number;
    name: string;
  }[];
}

export let loader: LoaderFunction = async () => {
  let repos = await listRepos().then((x) => x.data);

  let payload: ReposLoaderPayload = {
    repos: Object.values(repos).map((repo) => ({
      id: repo.id,
      name: repo.name,
    })),
  };

  return payload;
};
