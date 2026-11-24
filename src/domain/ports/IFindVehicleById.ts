import { Vehicle } from '../entities/Vehicle'
import { VehicleId } from '../value-objects/VehicleId'

export interface IFindVehicleById {
  findById(vehicleId: VehicleId): Promise<Vehicle | null>
}
