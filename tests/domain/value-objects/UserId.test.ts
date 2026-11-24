import { describe, it, expect } from 'vitest'
import { UserId } from '../../../src/domain/value-objects/UserId'
import { InvalidUserIdError } from '../../../src/domain/errors/InvalidUserIdError'

describe('UserId', () => {
  describe('from', () => {
    it('creates a valid user id', () => {
      const userId = UserId.from('user-1')

      expect(userId.asString()).toBe('user-1')
    })

    it.each(['', '   '])('rejects empty or blank id (%j)', (id) => {
      expect(() => UserId.from(id)).toThrow(InvalidUserIdError)
    })
  })

  describe('equals', () => {
    it('returns true for identical ids', () => {
      const a = UserId.from('user-1')
      const b = UserId.from('user-1')

      expect(a.equals(b)).toBe(true)
    })

    it('returns false for different ids', () => {
      const a = UserId.from('user-1')
      const b = UserId.from('user-2')

      expect(a.equals(b)).toBe(false)
    })
  })
})
