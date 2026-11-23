export class InvalidFleetIdError extends Error {
  constructor(id: string) {
    super(`Invalid Fleet ID: ${id}`)
    this.name = 'InvalidFleetIdError'
  }
}