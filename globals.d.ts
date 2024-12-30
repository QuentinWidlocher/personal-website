export { };
declare global {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    GITHUB_TOKEN: string;
    GITHUB_USERNAME: string;
    GITHUB_ARTICLES_REPO: string;
    GITHUB_ARTICLES_PATH: string;
    GITHUB_ARTICLES_BRANCH: string;

  }
  interface Process {
    env: ProcessEnv;
  }
  let process: Process;
}
