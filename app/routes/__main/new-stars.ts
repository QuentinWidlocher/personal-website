import { ShouldReloadFunction } from "remix"

export { loader } from "../../features/github/loaders/new-stars.loader"

export const unstable_shouldReload: ShouldReloadFunction = () => false
