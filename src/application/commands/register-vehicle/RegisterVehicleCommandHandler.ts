import { Vehicle } from '../../../domain/entities/Vehicle'
import { IFindFleetById } from '../../../domain/ports/IFindFleetById'
import { ISaveFleet } from '../../../domain/ports/ISaveFleet'
import { IFindVehicleById } from '../../../domain/ports/IFindVehicleById'
import { ISaveVehicle } from '../../../domain/ports/ISaveVehicle'
import { FleetNotFoundError } from '../../../domain/errors/FleetNotFoundError'
import { RegisterVehicleCommand } from './RegisterVehicleCommand'

export class RegisterVehicleCommandHandler {

  private readonly fleetRepository: IFindFleetById & ISaveFleet
  private readonly vehicleRepository: IFindVehicleById & ISaveVehicle

  constructor(props: RegisterVehicleCommandHandlerProps) {
    this.fleetRepository = props.fleetRepository
    this.vehicleRepository = props.vehicleRepository
  }

  async execute(command: RegisterVehicleCommand): Promise<void> {
    const fleet = await this.fleetRepository.findById(command.fleetId)

    if (!fleet) throw new FleetNotFoundError(command.fleetId)

    fleet.registerVehicle(command.vehicleId)

    const vehicle = (await this.vehicleRepository.findById(command.vehicleId)) ?? Vehicle.from({ id: command.vehicleId, location: null })

    await this.vehicleRepository.save(vehicle)
    await this.fleetRepository.save(fleet)
  }
}

export interface RegisterVehicleCommandHandlerProps {
  fleetRepository: IFindFleetById & ISaveFleet
  vehicleRepository: IFindVehicleById & ISaveVehicle
}