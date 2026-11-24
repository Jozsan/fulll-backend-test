import { VehicleId } from '../value-objects/VehicleId'
import { FleetId } from '../value-objects/FleetId'
import { UserId } from '../value-objects/UserId'

import { VehicleAlreadyRegisteredError } from '../errors/VehicleAlreadyRegisteredError'

export class Fleet {

  private readonly id: FleetId
  private readonly ownerId: UserId
  private readonly vehicleIds: Set<string>

  private constructor(props: FleetProps) {
    this.id = props.id
    this.ownerId = props.ownerId
    this.vehicleIds = new Set()
  }

  static from(props: FleetProps): Fleet {
    return new Fleet(props)
  }

  getId(): FleetId {
    return this.id
  }

  getOwnerId(): UserId {
    return this.ownerId
  }

  registerVehicle(vehicleId: VehicleId): void {
    if (this.vehicleIds.has(vehicleId.asString())) throw new VehicleAlreadyRegisteredError(vehicleId)

    this.vehicleIds.add(vehicleId.asString())
  }

  hasVehicle(vehicleId: VehicleId): boolean {
    return this.vehicleIds.has(vehicleId.asString())
  }
}

export interface FleetProps {
  id: FleetId
  ownerId: UserId
}