import { VehicleId } from '../../../domain/value-objects/VehicleId'

export class GetVehicleLocationQuery {
  constructor(readonly vehicleId: VehicleId) {}
}
