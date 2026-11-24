import { VehicleId } from '../value-objects/VehicleId'

export class VehicleAlreadyRegisteredError extends Error {
  constructor(vehicleId: VehicleId) {
    super(`Vehicle with ID ${vehicleId.asString()} is already registered.`)
    this.name = 'VehicleAlreadyRegisteredError'
  }
}