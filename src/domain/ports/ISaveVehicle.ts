import { Vehicle } from '../entities/Vehicle'

export interface ISaveVehicle {
  save(vehicle: Vehicle): Promise<void>
}
