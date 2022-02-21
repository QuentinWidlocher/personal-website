/**
 * Here are the types returned directly by the GitHub API.
 */

export interface GithubRepo {
	id: number
	node_id: string
	name: string
	full_name: string
	private: boolean
	owner: {
		login: string
		id: Number
		node_id: string
		avatar_url: string
		gravatar_id: string
		url: string
		html_url: string
		followers_url: string
		following_url: string
		gists_url: string
		starred_url: string
		subscriptions_url: string
		organizations_url: string
		repos_url: string
		events_url: string
		received_events_url: string
		type: string
		site_admin: boolean
	}
	html_url: string
	description: string | null
	fork: boolean
	url: string
	forks_url: string
	keys_url: string
	collaborators_url: string
	teams_url: string
	hooks_url: string
	issue_events_url: string
	events_url: string
	assignees_url: string
	branches_url: string
	tags_url: string
	blobs_url: string
	git_tags_url: string
	git_refs_url: string
	trees_url: string
	statuses_url: string
	languages_url: string
	stargazers_url: string
	contributors_url: string
	subscribers_url: string
	subscription_url: string
	commits_url: string
	git_commits_url: string
	comments_url: string
	issue_comment_url: string
	contents_url: string
	compare_url: string
	merges_url: string
	archive_url: string
	downloads_url: string
	issues_url: string
	pulls_url: string
	milestones_url: string
	notifications_url: string
	labels_url: string
	releases_url: string
	deployments_url: string
	created_at: string
	updated_at: string
	pushed_at: string
	git_url: string
	ssh_url: string
	clone_url: string
	svn_url: string
	homepage: unknown | null
	size: number
	stargazers_count: number
	watchers_count: number
	language: string
	has_issues: boolean
	has_projects: boolean
	has_downloads: boolean
	has_wiki: boolean
	has_pages: boolean
	forks_count: number
	mirror_url: unknown | null
	archived: boolean
	disabled: boolean
	open_issues_count: number
	license: unknown | null
	allow_forking: boolean
	is_template: boolean
	topics: string[]
	visibility: string
	forks: number
	open_issues: number
	watchers: number
	default_branch: string
}

export interface GithubCommit {
	sha: string
	node_id: string
	commit: {
		author: {
			name: string
			email: string
			date: string
		}
		committer: {
			name: string
			email: string
			date: string
		}
		message: string
		tree: {
			sha: string
			url: string
		}
		url: string
		comment_count: number
		verification: {
			verified: boolean
			reason: string
			signature: unknown | null
			payload: unknown | null
		}
	}
	url: string
	html_url: string
	comments_url: string
	author: {
		login: string
		id: number
		node_id: string
		avatar_url: string
		gravatar_id: string
		url: string
		html_url: string
		followers_url: string
		following_url: string
		gists_url: string
		starred_url: string
		subscriptions_url: string
		organizations_url: string
		repos_url: string
		events_url: string
		received_events_url: string
		type: string
		site_admin: boolean
	}
	committer: {
		login: string
		id: number
		node_id: string
		avatar_url: string
		gravatar_id: string
		url: string
		html_url: string
		followers_url: string
		following_url: string
		gists_url: string
		starred_url: string
		subscriptions_url: string
		organizations_url: string
		repos_url: string
		events_url: string
		received_events_url: string
		type: string
		site_admin: boolean
	}
	parents: [
		{
			sha: string
			url: string
			html_url: string
		},
	]
}

export interface GithubContent {
	name: string
	path: string
	sha: string
	size: number
	url: string
	html_url: string
	git_url: string
	download_url: string
	type: "file" | "dir"
	_links: {
		self: string
		git: string
		html: string
	}
}
