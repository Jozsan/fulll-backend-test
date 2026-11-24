import { Fleet } from '../../../domain/entities/Fleet'
import { IFindFleetById } from '../../../domain/ports/IFindFleetById'
import { ISaveFleet } from '../../../domain/ports/ISaveFleet'
import { FleetId } from '../../../domain/value-objects/FleetId'

export class InMemoryFleetRepository implements IFindFleetById, ISaveFleet {
  private fleets: Map<string, Fleet> = new Map()

  async findById(fleetId: FleetId): Promise<Fleet | null> {
    return this.fleets.get(fleetId.asString()) || null
  }

  async save(fleet: Fleet): Promise<void> {
    this.fleets.set(fleet.getId().asString(), fleet)
  }
}