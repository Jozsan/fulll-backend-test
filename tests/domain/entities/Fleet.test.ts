import { describe, it, expect, beforeEach } from 'vitest'
import { Fleet } from '../../../src/domain/entities/Fleet'
import { VehicleId } from '../../../src/domain/value-objects/VehicleId'
import { FleetId } from '../../../src/domain/value-objects/FleetId'
import { UserId } from '../../../src/domain/value-objects/UserId'
import { VehicleAlreadyRegisteredError } from '../../../src/domain/errors/VehicleAlreadyRegisteredError'

describe('Fleet', () => {
  let fleet: Fleet
  let vehicleId: VehicleId

  beforeEach(() => {
    fleet = Fleet.from({ id: FleetId.from('fleet-1'), ownerId: UserId.from('user-1') })
    vehicleId = VehicleId.from('AB-123-CD')
  })

  describe('getOwnerId', () => {
    it('returns the owner when the fleet was created with one', () => {
      const ownerId = UserId.from('user-1')
      const ownedFleet = Fleet.from({ id: FleetId.from('fleet-2'), ownerId })

      expect(ownedFleet.getOwnerId().equals(ownerId)).toBe(true)
    })
  })

  describe('registerVehicle', () => {
    it('registers a new vehicle', () => {
      fleet.registerVehicle(vehicleId)

      expect(fleet.hasVehicle(vehicleId)).toBe(true)
    })

    it('throws when the vehicle is already registered', () => {
      fleet.registerVehicle(vehicleId)

      expect(() => fleet.registerVehicle(vehicleId)).toThrow(VehicleAlreadyRegisteredError)
    })
  })

  describe('hasVehicle', () => {
    it('returns true when the vehicle is registered', () => {
      fleet.registerVehicle(vehicleId)

      expect(fleet.hasVehicle(vehicleId)).toBe(true)
    })

    it('returns false when the vehicle is not registered', () => {
      expect(fleet.hasVehicle(vehicleId)).toBe(false)
    })
  })

  describe('getVehicleIds', () => {
    it('returns an empty array when no vehicle is registered', () => {
      expect(fleet.getVehicleIds()).toEqual([])
    })

    it('returns the registered vehicle ids', () => {
      fleet.registerVehicle(vehicleId)

      expect(fleet.getVehicleIds().map((id) => id.asString())).toEqual([vehicleId.asString()])
    })

    it('reconstructs a fleet with its existing vehicle ids', () => {
      const reconstructed = Fleet.from({
        id: FleetId.from('fleet-3'),
        ownerId: UserId.from('user-1'),
        vehicleIds: [vehicleId],
      })

      expect(reconstructed.hasVehicle(vehicleId)).toBe(true)
    })
  })
})