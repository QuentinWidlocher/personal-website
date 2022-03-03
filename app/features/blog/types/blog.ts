export interface Article {
	title: string
	subtitle: string
	slug: string
	createdAt?: Date
	content: string
	cover?: {
		src: string
		alt?: string
	}
	series?: string
}
