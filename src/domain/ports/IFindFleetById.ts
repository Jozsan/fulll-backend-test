import { Fleet } from '../entities/Fleet'
import { FleetId } from '../value-objects/FleetId'

export interface IFindFleetById {
  findById(fleetId: FleetId): Promise<Fleet | null>
}