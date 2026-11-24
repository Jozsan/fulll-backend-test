import { Given, When, Then } from '@cucumber/cucumber'
import assert from 'node:assert'
import { CustomWorld } from '../support/world'
import { VehicleId } from '../../src/domain/value-objects/VehicleId'
import { GetVehicleLocationQuery } from '../../src/application/queries/get-vehicle-location/GetVehicleLocationQuery'
import { VehicleNotFoundError } from '../../src/domain/errors/VehicleNotFoundError'

Given('a vehicle that has never been registered', function (this: CustomWorld) {
  this.vehicleId = VehicleId.from('ZZ-999-ZZ')
})

When('I locate my vehicle', async function (this: CustomWorld) {
  try {
    this.locatedLocation = await this.getVehicleLocationHandler.execute(new GetVehicleLocationQuery(this.vehicleId))
  } catch (error) {
    this.error = error as Error
  }
})

Then('I should be told my vehicle is at this location', function (this: CustomWorld) {
  assert.ok(this.locatedLocation?.equals(this.location))
})

Then("I should be told my vehicle's location is unknown", function (this: CustomWorld) {
  assert.strictEqual(this.locatedLocation, null)
})

Then('I should be informed this vehicle was not found', function (this: CustomWorld) {
  assert.ok(this.error instanceof VehicleNotFoundError)
})
