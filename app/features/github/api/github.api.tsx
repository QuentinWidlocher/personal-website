import GitHub from "github-api";

const gh = new GitHub({
  token: process.env.GITHUB_TOKEN,
});

export function listRepos() {
  return gh.getUser("QuentinWidlocher").listRepos();
}
