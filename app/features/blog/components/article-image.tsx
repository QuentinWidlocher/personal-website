import { Article } from "../types/blog"

interface ArticleImageProps {
	article: Article
	srcSetMode?: "cover" | "card"
	className?: string
}

function getSrcSetCover(src: string) {
	return `
        ${src}?w=1440&auto=compress&cs=tinysrgb 1440w,
        ${src}?w=1920&auto=compress&cs=tinysrgb 1920w,
        ${src}?w=1536&auto=compress&cs=tinysrgb 1536w,
        ${src}?w=1280&auto=compress&cs=tinysrgb 1280w,
        ${src}?w=1024&auto=compress&cs=tinysrgb 1024w,
        ${src}?w=768&auto=compress&cs=tinysrgb 768w,
        ${src}?w=640&auto=compress&cs=tinysrgb 640w,
        ${src}?w=512&auto=compress&cs=tinysrgb 512w,
        ${src}?w=360&auto=compress&cs=tinysrgb 360w,
    `
}

const sizesCover = `
    (min-width: 1440px) 2048px,
    (min-width: 1920px) 1440px,
    (min-width: 1536px) 1920px,
    (min-width: 1280px) 1536px,
    (min-width: 1024px) 1280px,
    (min-width: 768px) 1024px,
    (min-width: 640px) 768px,
    (min-width: 512px) 640px,
    (min-width: 360px) 512px,
`

function getSrcSetCard(src: string) {
	return `
    ${src}?w=1280&auto=compress&cs=tinysrgb 1280w,
    ${src}?w=640&auto=compress&cs=tinysrgb 640w,
    ${src}?w=512&auto=compress&cs=tinysrgb 512w,
    ${src}?w=426&auto=compress&cs=tinysrgb 426w,
    ${src}?w=384&auto=compress&cs=tinysrgb 384w,
    ${src}?w=360&auto=compress&cs=tinysrgb 360w
`
}

// These are computed based on the screen size / the number of columns on the screen
const sizesCard = `
    (min-width: 1440px) 512px,
    (min-width: 1920px) 360px,
    (min-width: 1280px) 384px,
    (min-width: 1024px) 426px,
    (min-width: 768px) 512px,
    (min-width: 512px) 640px,
    (min-width: 360px) 360px
`

export default function ArticleImage({ article, className = "", srcSetMode = "cover" }: ArticleImageProps) {
	if (article?.cover != null) {
		let sizes = srcSetMode === "cover" ? sizesCover : sizesCard
		let srcSet = srcSetMode === "cover" ? getSrcSetCover(article.cover.src) : getSrcSetCard(article.cover.src)

		return <img className={`${className} object-cover object-center`} src={article.cover.src} srcSet={srcSet} sizes={sizes} alt={article.cover.alt ?? "Unrelated image, for decoration purpose"} />
	} else {
		return null
	}
}
