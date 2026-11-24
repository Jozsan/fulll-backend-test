import { describe, it, expect, vi } from 'vitest'
import { RegisterVehicleCommandHandler } from '../../../../src/application/commands/register-vehicle/RegisterVehicleCommandHandler'
import { RegisterVehicleCommand } from '../../../../src/application/commands/register-vehicle/RegisterVehicleCommand'
import { FleetId } from '../../../../src/domain/value-objects/FleetId'
import { VehicleId } from '../../../../src/domain/value-objects/VehicleId'
import { FleetNotFoundError } from '../../../../src/domain/errors/FleetNotFoundError'

describe('RegisterVehicleCommandHandler', () => {
  it('throws when the fleet does not exist', async () => {
    const fleetRepository = { findById: vi.fn().mockResolvedValue(null), save: vi.fn() }
    const vehicleRepository = { findById: vi.fn(), save: vi.fn() }
    const handler = new RegisterVehicleCommandHandler({ fleetRepository, vehicleRepository })
    const command = new RegisterVehicleCommand(FleetId.from('unknown'), VehicleId.from('AB-123-CD'))

    await expect(handler.execute(command)).rejects.toThrow(FleetNotFoundError)
    expect(fleetRepository.save).not.toHaveBeenCalled()
    expect(vehicleRepository.save).not.toHaveBeenCalled()
  })
})
