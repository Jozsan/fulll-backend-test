import { FleetId } from '../../../domain/value-objects/FleetId'
import { VehicleId } from '../../../domain/value-objects/VehicleId'
import { Location } from '../../../domain/value-objects/Location'

export class ParkVehicleCommand {
  constructor(
    readonly fleetId: FleetId,
    readonly vehicleId: VehicleId,
    readonly location: Location,
  ) {}
}
