import { randomUUID } from 'node:crypto'
import { Fleet } from '../../../domain/entities/Fleet'
import { FleetId } from '../../../domain/value-objects/FleetId'
import { UserId } from '../../../domain/value-objects/UserId'
import { ISaveFleet } from '../../../domain/ports/ISaveFleet'
import { CreateFleetCommand } from './CreateFleetCommand'

export class CreateFleetCommandHandler {

  private readonly fleetRepository: ISaveFleet

  constructor(props: CreateFleetCommandHandlerProps) {
    this.fleetRepository = props.fleetRepository
  }

  async execute(command: CreateFleetCommand): Promise<FleetId> {
    const fleetId = FleetId.from(randomUUID())
    const fleet = Fleet.from({ id: fleetId, ownerId: command.userId })

    await this.fleetRepository.save(fleet)

    return fleetId
  }
}

export interface CreateFleetCommandHandlerProps {
  fleetRepository: ISaveFleet
}
