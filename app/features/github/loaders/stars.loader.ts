import { LoaderFunction } from "remix";
import { getLastCommitFromRepo, listRepos, listStars } from "../api/github.api";
import { Repo } from "../types/repo";

export interface StarsLoaderPayload {
  repos: Repo[];
}

export let loader: LoaderFunction = async () => {
  let repos = await listStars();

  let mappedRepos: Repo[] = await Promise.all(
    repos.map(async (repo) => {
      return {
        id: repo.id,
        organization: repo.owner.login,
        name: repo.name,
        description: repo.description ?? undefined,
        url: repo.html_url,
        stars: repo.stargazers_count,
        tags: repo.topics ?? [],
        isFork: repo.fork,
        isTemplate: repo.is_template,
        updatedAt: new Date(repo.created_at),
      };
    })
  );

  let sortedRepos = mappedRepos.sort(
    (a, b) => (b.updatedAt?.getTime() ?? 0) - (a.updatedAt?.getTime() ?? 0)
  );

  let payload: StarsLoaderPayload = {
    repos: sortedRepos,
  };

  return payload;
};
