import GitHub, { Repo, Repository, Commit } from "github-api";
import { Cache } from "es-cache";

let cache: Cache<string, unknown>;
let gh: GitHub;

declare global {
  var __cache: Cache<string, unknown> | undefined;
  var __gh: GitHub;
}

if (!global.__cache) {
  global.__cache = new Cache();
}

if (!global.__gh) {
  global.__gh = new GitHub({
    token: process.env.GITHUB_TOKEN,
  });
}

cache = global.__cache;
gh = global.__gh;

export async function listRepos() {
  let repos = (await cache.get("repos")) as Repo[] | null;

  if (repos == null) {
    console.log("Fetching repos from GitHub...");

    repos = (await gh
      .getUser(process.env.GITHUB_USERNAME)
      .listRepos()
      .then((r) => Object.values(r.data))) as Repo[];

    console.log("Repo fetched, next is caching");

    cache.put("repos", repos, Number(process.env.GITHUB_CACHE_MS), async () => {
      console.log("Repos cache expired, fetching again");
      listRepos();
    });
  } else {
    console.log("Repos fetched from cache");
  }

  return repos;
}

export async function getLastCommitFromRepo(repoName: string): Promise<Commit> {
  let commit = (await cache.get(`${repoName}-lastcommit`)) as Commit | null;

  if (commit == null) {
    let repo: Repository = gh.getRepo(process.env.GITHUB_USERNAME!, repoName);

    commit = (await repo
      .listCommits()
      .then((req) => req.data)
      .then((commits) => commits[0])) as Commit;

    cache.put(
      `${repoName}-lastcommit`,
      commit,
      Number(process.env.GITHUB_CACHE_MS),
      async () => {
        getLastCommitFromRepo(repoName);
      }
    );
  }

  return commit;
}
