import { VehicleId } from '../value-objects/VehicleId'
import { FleetId } from '../value-objects/FleetId'

import { VehicleAlreadyRegisteredError } from '../errors/VehicleAlreadyRegisteredError'

export class Fleet {

  private readonly id: FleetId
  private readonly vehicleIds: Set<string>

  private constructor(props: FleetProps) {
    this.id = props.id
    this.vehicleIds = new Set()
  }

  static from(props: FleetProps): Fleet {
    return new Fleet(props)
  }

  getId(): FleetId {
    return this.id
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
}