export class ResourceIsRequired extends Error {
  constructor(resource: string) {
    super(`${resource} is required.`)
  }
}
