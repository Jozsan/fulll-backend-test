import { InMemoryFleetRepository } from '../persistence/in-memory/InMemoryFleetRepository'
import { InMemoryVehicleRepository } from '../persistence/in-memory/InMemoryVehicleRepository'
import { CreateFleetCommandHandler } from '../../application/commands/create-fleet/CreateFleetCommandHandler'
import { RegisterVehicleCommandHandler } from '../../application/commands/register-vehicle/RegisterVehicleCommandHandler'
import { ParkVehicleCommandHandler } from '../../application/commands/park-vehicle/ParkVehicleCommandHandler'

export function createCliDependencies() {
  const fleetRepository = new InMemoryFleetRepository()
  const vehicleRepository = new InMemoryVehicleRepository()

  return {
    createFleetHandler: new CreateFleetCommandHandler({ fleetRepository }),
    registerVehicleHandler: new RegisterVehicleCommandHandler({ fleetRepository, vehicleRepository }),
    parkVehicleHandler: new ParkVehicleCommandHandler({ fleetRepository, vehicleRepository }),
  }
}

export type CliDependencies = ReturnType<typeof createCliDependencies>
