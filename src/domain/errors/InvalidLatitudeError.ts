export class InvalidLatitudeError extends Error {
  constructor(value: number) {
    super(`Invalid latitude value: ${value} (expected between -90 and 90)`)
    this.name = 'InvalidLatitudeError'
  }
}
