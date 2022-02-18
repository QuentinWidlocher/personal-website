export interface Repo {
	id: number
	organization?: string
	name: string
	description?: string
	url: string
	stars: number
	tags: string[]
	isFork: boolean
	isTemplate: boolean
	updatedAt?: Date
}
