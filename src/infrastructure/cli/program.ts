import { Command } from 'commander'
import { FleetId } from '../../domain/value-objects/FleetId'
import { VehicleId } from '../../domain/value-objects/VehicleId'
import { Location } from '../../domain/value-objects/Location'
import { CreateFleetCommand } from '../../application/commands/create-fleet/CreateFleetCommand'
import { RegisterVehicleCommand } from '../../application/commands/register-vehicle/RegisterVehicleCommand'
import { ParkVehicleCommand } from '../../application/commands/park-vehicle/ParkVehicleCommand'
import { CliDependencies } from './dependencies'
import { UserId } from '../../domain/value-objects/UserId'

export function buildProgram(deps: CliDependencies): Command {
  const program = new Command('fleet')

  program
    .command('create')
    .argument('<userId>', 'id of the fleet owner')
    .action((userId: string) =>
      run(async () => {
        const command = new CreateFleetCommand(UserId.from(userId))
        const fleetId = await deps.createFleetHandler.execute(command)
        console.log(fleetId.asString())
      }),
    )

  program
    .command('register-vehicle')
    .argument('<fleetId>')
    .argument('<vehiclePlateNumber>')
    .action((fleetId: string, vehiclePlateNumber: string) =>
      run(async () => {
        const command = new RegisterVehicleCommand(
          FleetId.from(fleetId),
          VehicleId.from(vehiclePlateNumber)
        )
        await deps.registerVehicleHandler.execute(command)
        console.log(`Vehicle ${vehiclePlateNumber} registered into fleet ${fleetId}`)
      }),
    )

  program
    .command('localize-vehicle')
    .argument('<fleetId>')
    .argument('<vehiclePlateNumber>')
    .argument('<lat>')
    .argument('<lng>')
    .action((fleetId: string, vehiclePlateNumber: string, lat: string, lng: string) =>
      run(async () => {
        const command = new ParkVehicleCommand(
          FleetId.from(fleetId),
          VehicleId.from(vehiclePlateNumber),
          Location.from({ latitude: Number(lat), longitude: Number(lng) }
        ))
        await deps.parkVehicleHandler.execute(command)
        console.log(`Vehicle ${vehiclePlateNumber} parked at (${lat}, ${lng})`)
      }),
    )

  return program
}

async function run(action: () => Promise<void>): Promise<void> {
  try {
    await action()
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}
