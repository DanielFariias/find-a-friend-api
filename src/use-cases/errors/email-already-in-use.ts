export class EmailAlreadyInUseError extends Error {
  constructor() {
    super('E-mail already in use.')
  }
}
