import { Given, When, Then } from '@cucumber/cucumber'
import assert from 'node:assert'
import { CustomWorld } from '../support/world'
import { Fleet } from '../../src/domain/entities/Fleet'
import { FleetId } from '../../src/domain/value-objects/FleetId'
import { VehicleId } from '../../src/domain/value-objects/VehicleId'
import { RegisterVehicleCommand } from '../../src/application/commands/register-vehicle/RegisterVehicleCommand'
import { VehicleAlreadyRegisteredError } from '../../src/domain/errors/VehicleAlreadyRegisteredError'

Given('my fleet', async function (this: CustomWorld) {
  this.fleetId = FleetId.from('fleet-1')
  this.fleet = Fleet.from({ id: this.fleetId })
  await this.fleetRepository.save(this.fleet)
})

Given('the fleet of another user', async function (this: CustomWorld) {
  this.otherFleetId = FleetId.from('fleet-2')
  this.otherFleet = Fleet.from({ id: this.otherFleetId })
  await this.fleetRepository.save(this.otherFleet)
})

Given('a vehicle', function (this: CustomWorld) {
  this.vehicleId = VehicleId.from('AB-123-CD')
})

Given('I have registered this vehicle into my fleet', async function (this: CustomWorld) {
  await this.handler.execute(new RegisterVehicleCommand(this.fleetId, this.vehicleId))
})

Given("this vehicle has been registered into the other user's fleet", async function (this: CustomWorld) {
  await this.handler.execute(new RegisterVehicleCommand(this.otherFleetId, this.vehicleId))
})

When('I register this vehicle into my fleet', async function (this: CustomWorld) {
  await this.handler.execute(new RegisterVehicleCommand(this.fleetId, this.vehicleId))
})

When('I try to register this vehicle into my fleet', async function (this: CustomWorld) {
  try {
    await this.handler.execute(new RegisterVehicleCommand(this.fleetId, this.vehicleId))
  } catch (error) {
    this.error = error as Error
  }
})

Then('this vehicle should be part of my vehicle fleet', async function (this: CustomWorld) {
  const fleet = await this.fleetRepository.findById(this.fleetId)

  assert.ok(fleet?.hasVehicle(this.vehicleId))
})

Then('I should be informed this this vehicle has already been registered into my fleet', function (this: CustomWorld) {
  assert.ok(this.error instanceof VehicleAlreadyRegisteredError)
})