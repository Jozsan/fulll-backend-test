import { db } from '../persistence/postgres/client'
import { PostgresFleetRepository } from '../persistence/postgres/PostgresFleetRepository'
import { PostgresVehicleRepository } from '../persistence/postgres/PostgresVehicleRepository'
import { CreateFleetCommandHandler } from '../../application/commands/create-fleet/CreateFleetCommandHandler'
import { RegisterVehicleCommandHandler } from '../../application/commands/register-vehicle/RegisterVehicleCommandHandler'
import { ParkVehicleCommandHandler } from '../../application/commands/park-vehicle/ParkVehicleCommandHandler'
import { GetVehicleLocationQueryHandler } from '../../application/queries/get-vehicle-location/GetVehicleLocationQueryHandler'

export function createCliDependencies() {
  const fleetRepository = new PostgresFleetRepository(db)
  const vehicleRepository = new PostgresVehicleRepository(db)

  return {
    createFleetHandler: new CreateFleetCommandHandler({ fleetRepository }),
    registerVehicleHandler: new RegisterVehicleCommandHandler({ fleetRepository, vehicleRepository }),
    parkVehicleHandler: new ParkVehicleCommandHandler({ fleetRepository, vehicleRepository }),
    getVehicleLocationHandler: new GetVehicleLocationQueryHandler({ vehicleRepository }),
  }
}

export type CliDependencies = ReturnType<typeof createCliDependencies>
