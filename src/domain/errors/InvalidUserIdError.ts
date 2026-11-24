export class InvalidUserIdError extends Error {
  constructor(id: string) {
    super(`Invalid User ID: ${id}`)
    this.name = 'InvalidUserIdError'
  }
}
