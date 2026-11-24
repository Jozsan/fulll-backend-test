import { VehicleId } from '../value-objects/VehicleId'

export class VehicleAlreadyParkedAtLocationError extends Error {
  constructor(vehicleId: VehicleId) {
    super(`Vehicle with ID ${vehicleId.asString()} is already parked at this location.`)
    this.name = 'VehicleAlreadyParkedAtLocationError'
  }
}
