import { describe, it, expect, vi } from 'vitest'
import { CreateFleetCommandHandler } from '../../../../src/application/commands/create-fleet/CreateFleetCommandHandler'
import { CreateFleetCommand } from '../../../../src/application/commands/create-fleet/CreateFleetCommand'
import { FleetId } from '../../../../src/domain/value-objects/FleetId'
import { UserId } from '../../../../src/domain/value-objects/UserId'

describe('CreateFleetCommandHandler', () => {
  it('creates and persists a new fleet, returning its id', async () => {
    const fleetRepository = { save: vi.fn() }
    const handler = new CreateFleetCommandHandler({ fleetRepository })

    const fleetId = await handler.execute(new CreateFleetCommand(UserId.from('user-1')))

    expect(fleetId).toBeInstanceOf(FleetId)
    expect(fleetRepository.save).toHaveBeenCalledTimes(1)
    expect(fleetRepository.save.mock.calls[0][0].getId().equals(fleetId)).toBe(true)
  })

  it('persists the fleet with its owner', async () => {
    const fleetRepository = { save: vi.fn() }
    const handler = new CreateFleetCommandHandler({ fleetRepository })

    await handler.execute(new CreateFleetCommand(UserId.from('user-1')))

    const fleet = fleetRepository.save.mock.calls[0][0]
    expect(fleet.getOwnerId()?.equals(UserId.from('user-1'))).toBe(true)
  })

  it('generates a different fleet id on every call', async () => {
    const fleetRepository = { save: vi.fn() }
    const handler = new CreateFleetCommandHandler({ fleetRepository })

    const firstFleetId = await handler.execute(new CreateFleetCommand(UserId.from('user-1')))
    const secondFleetId = await handler.execute(new CreateFleetCommand(UserId.from('user-1')))

    expect(firstFleetId.equals(secondFleetId)).toBe(false)
  })
})
