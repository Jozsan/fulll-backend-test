import { Vehicle } from '../../../domain/entities/Vehicle'
import { IFindVehicleById } from '../../../domain/ports/IFindVehicleById'
import { ISaveVehicle } from '../../../domain/ports/ISaveVehicle'
import { VehicleId } from '../../../domain/value-objects/VehicleId'

export class InMemoryVehicleRepository implements IFindVehicleById, ISaveVehicle {
  private vehicles: Map<string, Vehicle> = new Map()

  async findById(vehicleId: VehicleId): Promise<Vehicle | null> {
    return this.vehicles.get(vehicleId.asString()) || null
  }

  async save(vehicle: Vehicle): Promise<void> {
    this.vehicles.set(vehicle.getIdAsString(), vehicle)
  }
}
