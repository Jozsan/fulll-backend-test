import { VehicleId } from '../value-objects/VehicleId'

export class VehicleNotRegisteredError extends Error {
  constructor(vehicleId: VehicleId) {
    super(`Vehicle with ID ${vehicleId.asString()} is not registered.`)
    this.name = 'VehicleNotRegisteredError'
  }
}