import { describe, it, expect } from 'vitest'
import { VehicleId } from '../../../src/domain/value-objects/VehicleId'
import { InvalidVehicleIdError } from '../../../src/domain/errors/InvalidVehicleIdError'

describe('VehicleId', () => {
  describe('from', () => {
    it('creates a valid vehicle id', () => {
      const vehicleId = VehicleId.from('AB-123-CD')

      expect(vehicleId.getId()).toBe('AB-123-CD')
    })

    it.each([
      'ab-123-cd',
      'AB-12-CD',
      'AB-1234-CD',
      'AB-123-C',
      'ABC-123-CD',
      'AB123CD',
      '',
    ])('rejects invalid vehicle id format (%s)', (id) => {
      expect(() => VehicleId.from(id)).toThrow(InvalidVehicleIdError)
    })
  })

  describe('getId', () => {
    it('returns the id string', () => {
      const vehicleId = VehicleId.from('AB-123-CD')

      expect(vehicleId.getId()).toBe('AB-123-CD')
    })
  })

  describe('asString', () => {
    it('returns the id string', () => {
      const vehicleId = VehicleId.from('AB-123-CD')

      expect(vehicleId.asString()).toBe('AB-123-CD')
    })
  })

  describe('equals', () => {
    it('returns true for identical ids', () => {
      const a = VehicleId.from('AB-123-CD')
      const b = VehicleId.from('AB-123-CD')

      expect(a.equals(b)).toBe(true)
    })

    it('returns false for different ids', () => {
      const a = VehicleId.from('AB-123-CD')
      const b = VehicleId.from('EF-456-GH')

      expect(a.equals(b)).toBe(false)
    })
  })
})