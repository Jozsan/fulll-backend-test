import { describe, it, expect } from 'vitest'
import { FleetId } from '../../../src/domain/value-objects/FleetId'
import { InvalidFleetIdError } from '../../../src/domain/errors/InvalidFleetIdError'

describe('FleetId', () => {
  describe('from', () => {
    it('creates a valid fleet id', () => {
      const fleetId = FleetId.from('fleet-1')

      expect(fleetId.asString()).toBe('fleet-1')
    })

    it.each(['', '   '])('rejects empty or blank id (%j)', (id) => {
      expect(() => FleetId.from(id)).toThrow(InvalidFleetIdError)
    })
  })

  describe('equals', () => {
    it('returns true for identical ids', () => {
      const a = FleetId.from('fleet-1')
      const b = FleetId.from('fleet-1')

      expect(a.equals(b)).toBe(true)
    })

    it('returns false for different ids', () => {
      const a = FleetId.from('fleet-1')
      const b = FleetId.from('fleet-2')

      expect(a.equals(b)).toBe(false)
    })
  })
})