import { Vehicle } from '../../../domain/entities/Vehicle'
import { IFindFleetById } from '../../../domain/ports/IFindFleetById'
import { IFindVehicleById } from '../../../domain/ports/IFindVehicleById'
import { ISaveVehicle } from '../../../domain/ports/ISaveVehicle'
import { FleetNotFoundError } from '../../../domain/errors/FleetNotFoundError'
import { VehicleNotRegisteredError } from '../../../domain/errors/VehicleNotRegisteredError'
import { ParkVehicleCommand } from './ParkVehicleCommand'

export class ParkVehicleCommandHandler {

  private readonly fleetRepository: IFindFleetById
  private readonly vehicleRepository: IFindVehicleById & ISaveVehicle

  constructor(props: ParkVehicleCommandHandlerProps) {
    this.fleetRepository = props.fleetRepository
    this.vehicleRepository = props.vehicleRepository
  }

  async execute(command: ParkVehicleCommand): Promise<void> {
    const fleet = await this.fleetRepository.findById(command.fleetId)

    if (!fleet) throw new FleetNotFoundError(command.fleetId)
    if (!fleet.hasVehicle(command.vehicleId)) throw new VehicleNotRegisteredError(command.vehicleId)

    const vehicle = await this.vehicleRepository.findById(command.vehicleId)

    if (!vehicle) throw new VehicleNotRegisteredError(command.vehicleId)

    vehicle.parkAt(command.location)

    await this.vehicleRepository.save(vehicle)
  }
}

export interface ParkVehicleCommandHandlerProps {
  fleetRepository: IFindFleetById
  vehicleRepository: IFindVehicleById & ISaveVehicle
}
