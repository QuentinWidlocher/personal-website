export type Serialized<T extends {}> = {
	[K in keyof T]: T[K] extends Date | undefined ? string | undefined : T[K] extends {} ? Serialized<T[K]> : T[K]
}
