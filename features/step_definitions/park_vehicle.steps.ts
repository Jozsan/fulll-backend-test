import assert from 'node:assert'
import { Given, When, Then } from '@cucumber/cucumber'
import { CustomWorld } from '../support/world'
import { Location } from '../../src/domain/value-objects/Location'
import { ParkVehicleCommand } from '../../src/application/commands/park-vehicle/ParkVehicleCommand'
import { VehicleAlreadyParkedAtLocationError } from '../../src/domain/errors/VehicleAlreadyParkedAtLocationError'

Given('a location', function (this: CustomWorld) {
  this.location = Location.from({ latitude: 48.8566, longitude: 2.3522 })
})

Given('my vehicle has been parked into this location', async function (this: CustomWorld) {
  await this.parkVehicleHandler.execute(new ParkVehicleCommand(this.fleetId, this.vehicleId, this.location))
})

When('I park my vehicle at this location', async function (this: CustomWorld) {
  await this.parkVehicleHandler.execute(new ParkVehicleCommand(this.fleetId, this.vehicleId, this.location))
})

When('I try to park my vehicle at this location', async function (this: CustomWorld) {
  try {
    await this.parkVehicleHandler.execute(new ParkVehicleCommand(this.fleetId, this.vehicleId, this.location))
  } catch (error) {
    this.error = error as Error
  }
})

Then('the known location of my vehicle should verify this location', async function (this: CustomWorld) {
  const vehicle = await this.vehicleRepository.findById(this.vehicleId)

  assert.ok(vehicle?.getLocation()?.equals(this.location))
})

Then('I should be informed that my vehicle is already parked at this location', function (this: CustomWorld) {
  assert.ok(this.error instanceof VehicleAlreadyParkedAtLocationError)
})
