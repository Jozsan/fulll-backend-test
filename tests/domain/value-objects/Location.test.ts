import { describe, it, expect } from 'vitest'
import { Location } from '../../../src/domain/value-objects/Location'
import { InvalidLatitudeError } from '../../../src/domain/errors/InvalidLatitudeError'
import { InvalidLongitudeError } from '../../../src/domain/errors/InvalidLongitudeError'

describe('Location', () => {
  describe('from', () => {
    it('creates a valid location', () => {
      const location = Location.from({ latitude: 48.8566, longitude: 2.3522 })

      expect(location.getLatitude()).toBe(48.8566)
      expect(location.getLongitude()).toBe(2.3522)
    })

    it.each([-90, 90, 0])('accepts boundary latitude values (%d)', (latitude) => {
      expect(() => Location.from({ latitude, longitude: 0 })).not.toThrow()
    })

    it.each([-91, 91, NaN])('rejects invalid latitude values (%s)', (latitude) => {
      expect(() => Location.from({ latitude, longitude: 0 })).toThrow(InvalidLatitudeError)
    })

    it.each([-181, 181, NaN])('rejects invalid longitude values (%s)', (longitude) => {
      expect(() => Location.from({ latitude: 0, longitude })).toThrow(InvalidLongitudeError)
    })
  })

  describe('equals', () => {
    it('returns true for identical coordinates', () => {
      const a = Location.from({ latitude: 10, longitude: 20 })
      const b = Location.from({ latitude: 10, longitude: 20 })

      expect(a.equals(b)).toBe(true)
    })

    it('returns false for different coordinates', () => {
      const a = Location.from({ latitude: 10, longitude: 20 })
      const b = Location.from({ latitude: 11, longitude: 20 })

      expect(a.equals(b)).toBe(false)
    })
  })
})