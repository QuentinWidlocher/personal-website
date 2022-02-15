import { ReposLoaderPayload } from "../loaders/repos.loader";

interface ReposPageProps {
  repos: ReposLoaderPayload["repos"];
}

export default function ReposPage({ repos }: ReposPageProps) {
  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>{repo.name}</li>
      ))}
    </ul>
  );
}
