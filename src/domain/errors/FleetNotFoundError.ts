import { FleetId } from '../value-objects/FleetId'

export class FleetNotFoundError extends Error {
  constructor(fleetId: FleetId) {
    super(`Fleet with ID ${fleetId.asString()} was not found.`)
    this.name = 'FleetNotFoundError'
  }
}