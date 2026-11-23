export class InvalidVehicleIdError extends Error {
  constructor(value: string) {
    super(`Invalid VehicleId value: ${value} (expected format XX-999-XX)`)
    this.name = 'InvalidVehicleIdError'
  }
}
