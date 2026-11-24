import { setWorldConstructor, World } from '@cucumber/cucumber'
import { FleetId } from '../../src/domain/value-objects/FleetId'
import { VehicleId } from '../../src/domain/value-objects/VehicleId'
import { Location } from '../../src/domain/value-objects/Location'
import { Fleet } from '../../src/domain/entities/Fleet'
import { InMemoryFleetRepository } from '../../src/infrastructure/persistence/in-memory/InMemoryFleetRepository'
import { InMemoryVehicleRepository } from '../../src/infrastructure/persistence/in-memory/InMemoryVehicleRepository'
import { RegisterVehicleCommandHandler } from '../../src/application/commands/register-vehicle/RegisterVehicleCommandHandler'
import { ParkVehicleCommandHandler } from '../../src/application/commands/park-vehicle/ParkVehicleCommandHandler'

export class CustomWorld extends World {
  fleetRepository = new InMemoryFleetRepository()
  vehicleRepository = new InMemoryVehicleRepository()
  handler = new RegisterVehicleCommandHandler({ fleetRepository: this.fleetRepository, vehicleRepository: this.vehicleRepository })
  parkVehicleHandler = new ParkVehicleCommandHandler({ fleetRepository: this.fleetRepository, vehicleRepository: this.vehicleRepository })

  fleetId!: FleetId
  fleet!: Fleet
  otherFleetId!: FleetId
  otherFleet!: Fleet
  vehicleId!: VehicleId
  location!: Location
  error?: Error
}

setWorldConstructor(CustomWorld)