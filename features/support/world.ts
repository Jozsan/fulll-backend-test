import { setWorldConstructor, World } from '@cucumber/cucumber'
import { FleetId } from '../../src/domain/value-objects/FleetId'
import { VehicleId } from '../../src/domain/value-objects/VehicleId'
import { Location } from '../../src/domain/value-objects/Location'
import { Fleet } from '../../src/domain/entities/Fleet'
import { IFindFleetById } from '../../src/domain/ports/IFindFleetById'
import { ISaveFleet } from '../../src/domain/ports/ISaveFleet'
import { IFindVehicleById } from '../../src/domain/ports/IFindVehicleById'
import { ISaveVehicle } from '../../src/domain/ports/ISaveVehicle'
import { InMemoryFleetRepository } from '../../src/infrastructure/persistence/in-memory/InMemoryFleetRepository'
import { InMemoryVehicleRepository } from '../../src/infrastructure/persistence/in-memory/InMemoryVehicleRepository'
import { db } from '../../src/infrastructure/persistence/postgres/client'
import { PostgresFleetRepository } from '../../src/infrastructure/persistence/postgres/PostgresFleetRepository'
import { PostgresVehicleRepository } from '../../src/infrastructure/persistence/postgres/PostgresVehicleRepository'
import { RegisterVehicleCommandHandler } from '../../src/application/commands/register-vehicle/RegisterVehicleCommandHandler'
import { ParkVehicleCommandHandler } from '../../src/application/commands/park-vehicle/ParkVehicleCommandHandler'
import { GetVehicleLocationQueryHandler } from '../../src/application/queries/get-vehicle-location/GetVehicleLocationQueryHandler'

export const usesPostgres = process.env.PERSISTENCE === 'postgres'

function buildFleetRepository(): IFindFleetById & ISaveFleet {
  return usesPostgres ? new PostgresFleetRepository(db) : new InMemoryFleetRepository()
}

function buildVehicleRepository(): IFindVehicleById & ISaveVehicle {
  return usesPostgres ? new PostgresVehicleRepository(db) : new InMemoryVehicleRepository()
}

export class CustomWorld extends World {
  fleetRepository = buildFleetRepository()
  vehicleRepository = buildVehicleRepository()
  handler = new RegisterVehicleCommandHandler({ fleetRepository: this.fleetRepository, vehicleRepository: this.vehicleRepository })
  parkVehicleHandler = new ParkVehicleCommandHandler({ fleetRepository: this.fleetRepository, vehicleRepository: this.vehicleRepository })
  getVehicleLocationHandler = new GetVehicleLocationQueryHandler({ vehicleRepository: this.vehicleRepository })

  fleetId!: FleetId
  fleet!: Fleet
  otherFleetId!: FleetId
  otherFleet!: Fleet
  vehicleId!: VehicleId
  location!: Location
  locatedLocation?: Location | null
  error?: Error
}

setWorldConstructor(CustomWorld)
