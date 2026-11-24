import { VehicleId } from '../value-objects/VehicleId'

export class VehicleNotFoundError extends Error {
  constructor(vehicleId: VehicleId) {
    super(`Vehicle with ID ${vehicleId.asString()} was not found.`)
    this.name = 'VehicleNotFoundError'
  }
}
