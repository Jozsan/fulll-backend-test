import { Location } from '../../../domain/value-objects/Location'
import { IFindVehicleById } from '../../../domain/ports/IFindVehicleById'
import { VehicleNotFoundError } from '../../../domain/errors/VehicleNotFoundError'
import { GetVehicleLocationQuery } from './GetVehicleLocationQuery'

export class GetVehicleLocationQueryHandler {

  private readonly vehicleRepository: IFindVehicleById

  constructor(props: GetVehicleLocationQueryHandlerProps) {
    this.vehicleRepository = props.vehicleRepository
  }

  async execute(query: GetVehicleLocationQuery): Promise<Location | null> {
    const vehicle = await this.vehicleRepository.findById(query.vehicleId)

    if (!vehicle) throw new VehicleNotFoundError(query.vehicleId)

    return vehicle.getLocation()
  }
}

export interface GetVehicleLocationQueryHandlerProps {
  vehicleRepository: IFindVehicleById
}
