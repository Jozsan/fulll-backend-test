export class InvalidLongitudeError extends Error {
  constructor(value: number) {
    super(`Invalid longitude value: ${value} (expected between -180 and 180)`)
    this.name = 'InvalidLongitudeError'
  }
}