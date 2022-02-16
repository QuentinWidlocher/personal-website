import { LoaderFunction } from "remix";
import { listRepos } from "../api/github.api";

export interface ReposLoaderPayload {
  repos: {
    id: number;
    name: string;
    description?: string;
    url: string;
    stars: number;
    tags: string[];
    isFork: boolean;
    isTemplate: boolean;
    updatedAt: Date;
  }[];
}

export let loader: LoaderFunction = async () => {
  let repos = await listRepos();

  let payload: ReposLoaderPayload = {
    repos: repos
      .filter((r) => !r.private && !r.archived && !r.disabled)
      .map((repo) => {
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description ?? undefined,
          url: repo.html_url,
          stars: repo.stargazers_count,
          tags: repo.topics ?? [],
          isFork: repo.fork,
          isTemplate: repo.is_template,
          updatedAt: new Date(repo.pushed_at),
        };
      })
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
  };

  return payload;
};
