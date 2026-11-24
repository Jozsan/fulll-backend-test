import { FleetId } from '../../../domain/value-objects/FleetId'
import { VehicleId } from '../../../domain/value-objects/VehicleId'

export class RegisterVehicleCommand {
  constructor(
    readonly fleetId: FleetId,
    readonly vehicleId: VehicleId,
  ) {}
}