import { describe, it, expect, beforeEach } from 'vitest'
import { Vehicle } from '../../../src/domain/entities/Vehicle'
import { VehicleId } from '../../../src/domain/value-objects/VehicleId'
import { Location } from '../../../src/domain/value-objects/Location'
import { VehicleAlreadyParkedAtLocationError } from '../../../src/domain/errors/VehicleAlreadyParkedAtLocationError'

describe('Vehicle', () => {
  let vehicle: Vehicle
  let location: Location

  beforeEach(() => {
    vehicle = Vehicle.from({ id: VehicleId.from('AB-123-CD'), location: null })
    location = Location.from({ latitude: 48.8566, longitude: 2.3522 })
  })

  describe('getLocation', () => {
    it('returns null when the vehicle has not been parked yet', () => {
      expect(vehicle.getLocation()).toBeNull()
    })
  })

  describe('parkAt', () => {
    it('parks the vehicle at a location', () => {
      vehicle.parkAt(location)

      expect(vehicle.getLocation()).toBe(location)
    })

    it('throws when parking at the same location twice', () => {
      vehicle.parkAt(location)

      expect(() => vehicle.parkAt(location)).toThrow(VehicleAlreadyParkedAtLocationError)
    })

    it('allows parking at a different location', () => {
      const otherLocation = Location.from({ latitude: 45.764, longitude: 4.8357 })
      vehicle.parkAt(location)

      vehicle.parkAt(otherLocation)

      expect(vehicle.getLocation()).toBe(otherLocation)
    })
  })
})
