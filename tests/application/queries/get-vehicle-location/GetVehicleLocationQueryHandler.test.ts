import { describe, it, expect, vi } from 'vitest'
import { GetVehicleLocationQueryHandler } from '../../../../src/application/queries/get-vehicle-location/GetVehicleLocationQueryHandler'
import { GetVehicleLocationQuery } from '../../../../src/application/queries/get-vehicle-location/GetVehicleLocationQuery'
import { Vehicle } from '../../../../src/domain/entities/Vehicle'
import { VehicleId } from '../../../../src/domain/value-objects/VehicleId'
import { Location } from '../../../../src/domain/value-objects/Location'
import { VehicleNotFoundError } from '../../../../src/domain/errors/VehicleNotFoundError'

describe('GetVehicleLocationQueryHandler', () => {
  it('returns the location when the vehicle has been parked', async () => {
    const location = Location.from({ latitude: 48.8566, longitude: 2.3522 })
    const vehicle = Vehicle.from({ id: VehicleId.from('AB-123-CD'), location })
    const vehicleRepository = { findById: vi.fn().mockResolvedValue(vehicle) }
    const handler = new GetVehicleLocationQueryHandler({ vehicleRepository })

    const result = await handler.execute(new GetVehicleLocationQuery(VehicleId.from('AB-123-CD')))

    expect(result?.equals(location)).toBe(true)
  })

  it('returns null when the vehicle has never been parked', async () => {
    const vehicle = Vehicle.from({ id: VehicleId.from('AB-123-CD'), location: null })
    const vehicleRepository = { findById: vi.fn().mockResolvedValue(vehicle) }
    const handler = new GetVehicleLocationQueryHandler({ vehicleRepository })

    const result = await handler.execute(new GetVehicleLocationQuery(VehicleId.from('AB-123-CD')))

    expect(result).toBeNull()
  })

  it('throws when the vehicle does not exist', async () => {
    const vehicleRepository = { findById: vi.fn().mockResolvedValue(null) }
    const handler = new GetVehicleLocationQueryHandler({ vehicleRepository })

    await expect(handler.execute(new GetVehicleLocationQuery(VehicleId.from('AB-123-CD')))).rejects.toThrow(
      VehicleNotFoundError,
    )
  })
})
