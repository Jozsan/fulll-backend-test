import { describe, it, expect, vi } from 'vitest'
import { ParkVehicleCommandHandler } from '../../../../src/application/commands/park-vehicle/ParkVehicleCommandHandler'
import { ParkVehicleCommand } from '../../../../src/application/commands/park-vehicle/ParkVehicleCommand'
import { RegisterVehicleCommandHandler } from '../../../../src/application/commands/register-vehicle/RegisterVehicleCommandHandler'
import { RegisterVehicleCommand } from '../../../../src/application/commands/register-vehicle/RegisterVehicleCommand'
import { FleetId } from '../../../../src/domain/value-objects/FleetId'
import { VehicleId } from '../../../../src/domain/value-objects/VehicleId'
import { Location } from '../../../../src/domain/value-objects/Location'
import { Fleet } from '../../../../src/domain/entities/Fleet'
import { FleetNotFoundError } from '../../../../src/domain/errors/FleetNotFoundError'
import { VehicleNotRegisteredError } from '../../../../src/domain/errors/VehicleNotRegisteredError'
import { InMemoryFleetRepository } from '../../../../src/infrastructure/persistence/in-memory/InMemoryFleetRepository'
import { InMemoryVehicleRepository } from '../../../../src/infrastructure/persistence/in-memory/InMemoryVehicleRepository'

describe('ParkVehicleCommandHandler', () => {
  it('throws when the fleet does not exist', async () => {
    const fleetRepository = { findById: vi.fn().mockResolvedValue(null) }
    const vehicleRepository = { findById: vi.fn(), save: vi.fn() }
    const handler = new ParkVehicleCommandHandler({ fleetRepository, vehicleRepository })
    const command = new ParkVehicleCommand(
      FleetId.from('unknown'),
      VehicleId.from('AB-123-CD'),
      Location.from({ latitude: 0, longitude: 0 }),
    )

    await expect(handler.execute(command)).rejects.toThrow(FleetNotFoundError)
    expect(vehicleRepository.save).not.toHaveBeenCalled()
  })

  it('throws when the vehicle is not registered in the fleet', async () => {
    const fleet = Fleet.from({ id: FleetId.from('fleet-1') })
    const fleetRepository = { findById: vi.fn().mockResolvedValue(fleet) }
    const vehicleRepository = { findById: vi.fn(), save: vi.fn() }
    const handler = new ParkVehicleCommandHandler({ fleetRepository, vehicleRepository })
    const command = new ParkVehicleCommand(
      fleet.getId(),
      VehicleId.from('AB-123-CD'),
      Location.from({ latitude: 0, longitude: 0 }),
    )

    await expect(handler.execute(command)).rejects.toThrow(VehicleNotRegisteredError)
    expect(vehicleRepository.save).not.toHaveBeenCalled()
  })

  it('shares a single location across every fleet referencing the same vehicle', async () => {
    const fleetRepository = new InMemoryFleetRepository()
    const vehicleRepository = new InMemoryVehicleRepository()
    const registerHandler = new RegisterVehicleCommandHandler({ fleetRepository, vehicleRepository })
    const parkHandler = new ParkVehicleCommandHandler({ fleetRepository, vehicleRepository })

    const fleetAId = FleetId.from('fleet-a')
    const fleetBId = FleetId.from('fleet-b')
    const vehicleId = VehicleId.from('AB-123-CD')
    const location = Location.from({ latitude: 48.8566, longitude: 2.3522 })

    await fleetRepository.save(Fleet.from({ id: fleetAId }))
    await fleetRepository.save(Fleet.from({ id: fleetBId }))
    await registerHandler.execute(new RegisterVehicleCommand(fleetAId, vehicleId))
    await registerHandler.execute(new RegisterVehicleCommand(fleetBId, vehicleId))

    await parkHandler.execute(new ParkVehicleCommand(fleetAId, vehicleId, location))

    const vehicle = await vehicleRepository.findById(vehicleId)

    expect(vehicle?.getLocation()?.equals(location)).toBe(true)
  })
})

