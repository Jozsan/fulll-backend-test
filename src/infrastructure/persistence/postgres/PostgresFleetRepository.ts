import { eq } from 'drizzle-orm'
import { Fleet } from '../../../domain/entities/Fleet'
import { FleetId } from '../../../domain/value-objects/FleetId'
import { UserId } from '../../../domain/value-objects/UserId'
import { VehicleId } from '../../../domain/value-objects/VehicleId'
import { IFindFleetById } from '../../../domain/ports/IFindFleetById'
import { ISaveFleet } from '../../../domain/ports/ISaveFleet'
import { Database } from './client'
import { fleets, fleetVehicles } from './schema'

export class PostgresFleetRepository implements IFindFleetById, ISaveFleet {
  constructor(private readonly db: Database) {}

  async findById(fleetId: FleetId): Promise<Fleet | null> {
    const [fleetRow] = await this.db
      .select()
      .from(fleets)
      .where(eq(fleets.id, fleetId.asString()))

    if (!fleetRow) return null

    const membershipRows = await this.db
      .select()
      .from(fleetVehicles)
      .where(eq(fleetVehicles.fleetId, fleetId.asString()))

    return Fleet.from({
      id: FleetId.from(fleetRow.id),
      ownerId: UserId.from(fleetRow.ownerId),
      vehicleIds: membershipRows.map((row) => VehicleId.from(row.vehicleId)),
    })
  }

  async save(fleet: Fleet): Promise<void> {
    const fleetId = fleet.getId().asString()

    await this.db.transaction(async (tx) => {
      await tx
        .insert(fleets)
        .values({
          id: fleetId,
          ownerId: fleet.getOwnerId().asString()
        })
        .onConflictDoUpdate({
          target: fleets.id,
          set: { ownerId: fleet.getOwnerId().asString() }
        })

      await tx
        .delete(fleetVehicles)
        .where(eq(fleetVehicles.fleetId, fleetId))

      const vehicleIds = fleet.getVehicleIds()
      if (vehicleIds.length > 0) {
        await tx
          .insert(fleetVehicles)
          .values(vehicleIds.map((vehicleId) => ({ fleetId, vehicleId: vehicleId.asString() })))
      }
    })
  }
}
