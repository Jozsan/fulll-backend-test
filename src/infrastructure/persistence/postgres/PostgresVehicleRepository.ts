import { eq } from 'drizzle-orm'
import { Vehicle } from '../../../domain/entities/Vehicle'
import { VehicleId } from '../../../domain/value-objects/VehicleId'
import { Location } from '../../../domain/value-objects/Location'
import { IFindVehicleById } from '../../../domain/ports/IFindVehicleById'
import { ISaveVehicle } from '../../../domain/ports/ISaveVehicle'
import { Database } from './client'
import { vehicles } from './schema'

export class PostgresVehicleRepository implements IFindVehicleById, ISaveVehicle {
  constructor(private readonly db: Database) {}

  async findById(vehicleId: VehicleId): Promise<Vehicle | null> {
    const [row] = await this.db.select().from(vehicles).where(eq(vehicles.id, vehicleId.asString()))

    if (!row) return null

    const location =
      row.latitude !== null && row.longitude !== null
        ? Location.from({ latitude: row.latitude, longitude: row.longitude })
        : null

    return Vehicle.from({ id: VehicleId.from(row.id), location })
  }

  async save(vehicle: Vehicle): Promise<void> {
    const location = vehicle.getLocation()
    const latitude = location?.getLatitude() ?? null
    const longitude = location?.getLongitude() ?? null

    await this.db
      .insert(vehicles)
      .values({ id: vehicle.getIdAsString(), latitude, longitude })
      .onConflictDoUpdate({ target: vehicles.id, set: { latitude, longitude } })
  }
}
