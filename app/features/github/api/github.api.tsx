import GitHub, { Repo } from "github-api";

const gh = new GitHub({
  token: process.env.GITHUB_TOKEN,
});

export async function listRepos() {
  return gh
    .getUser(process.env.GITHUB_USERNAME)
    .listRepos()
    .then((r) => Object.values(r.data));
}
