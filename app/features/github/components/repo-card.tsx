import Star from "iconoir-react/dist/Star"
import GitMerge from "iconoir-react/dist/GitMerge"
import Map from "iconoir-react/dist/Map"
import Card from "~/components/card"
import { RepoLoaderPayload } from "~/routes/_main.stars"

type Repo = RepoLoaderPayload["repos"][number]

type RepoCardProps = {
  repo: Omit<Repo, "updatedAt" | 'organization'> & { organization?: Repo['organization'] }
}

function getIcon(repo: Omit<Repo, "updatedAt" | 'organization'> & { organization?: Repo['organization'] }) {
  if (repo.isTemplate) {
    return (
      <div className="text-lg" data-tooltip title="This repo is a template">
        <Map />
      </div>
    )
  } else if (repo.isFork) {
    return (
      <div className="text-lg" data-tooltip title="This repo is a fork">
        <GitMerge />
      </div>
    )
  } else {
    return null
  }
}

function titleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(" ")
}

function formatTitle(title: string) {
  return titleCase(title.replace(/\-/g, " "))
}

// This piece of magical css is used to fade a div in its last 25%
const fadingInlineStyle: React.CSSProperties = {
  WebkitMaskImage: "-webkit-gradient(linear, left center, right center, from(rgba(0,0,0,1)), color-stop(0.75, rgba(0,0,0,1)), to(rgba(0,0,0,0)))",
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <a href={repo.url} target="_blank" rel="noopener">
      <Card
        centered
        titleSlot={
          <>
            {getIcon(repo)}
            <h1 className="text-xl">
              {repo.organization ? <span className="mr-2 text-lg text-slate-200 dark:text-slate-400 group-hover:text-sky-200">{repo.organization} /</span> : null}
              <span className="font-bold">{formatTitle(repo.name)}</span>
            </h1>
          </>
        }
        subTitleSlot={<>{repo.description}</>}
      >
        <div className="flex flex-wrap items-center justify-between">
          {repo.stars > 0 ? (
            <>
              <div className="flex mt-5 space-x-2 text-base text-slate-200 dark:text-slate-400 group-hover:text-sky-200">
                <Star />
                <span>{repo.stars}</span>
              </div>
              <div className="mx-2" role="separator"></div>
            </>
          ) : null}
          <ul tabIndex={-1} className="relative flex pr-10 mt-5 -mr-5 space-x-2 overflow-x-hidden" style={fadingInlineStyle}>
            {repo.tags.map((tag) => (
              <li
                key={tag}
                className="px-2 py-1 text-sm border rounded whitespace-nowrap border-slate-200/50 dark:border-slate-500/50 text-slate-200 dark:text-slate-400 group-hover:border-sky-200/50 dark:group-hover:border-sky-500/50 group-hover:text-sky-200"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </a>
  )
}
