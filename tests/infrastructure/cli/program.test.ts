import { describe, it, expect, vi, afterEach } from 'vitest'
import { buildProgram } from '../../../src/infrastructure/cli/program'
import { CliDependencies } from '../../../src/infrastructure/cli/dependencies'
import { FleetId } from '../../../src/domain/value-objects/FleetId'
import { FleetNotFoundError } from '../../../src/domain/errors/FleetNotFoundError'

function buildDeps(overrides: Partial<CliDependencies> = {}): CliDependencies {
  return {
    createFleetHandler: { execute: vi.fn() },
    registerVehicleHandler: { execute: vi.fn() },
    parkVehicleHandler: { execute: vi.fn() },
    ...overrides,
  } as unknown as CliDependencies
}

describe('CLI program', () => {
  afterEach(() => {
    process.exitCode = undefined
    vi.restoreAllMocks()
  })

  it('create: prints the generated fleet id', async () => {
    const deps = buildDeps({
      createFleetHandler: { execute: vi.fn().mockResolvedValue(FleetId.from('generated-id')) } as never,
    })
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})

    await buildProgram(deps).parseAsync(['create', 'user-1'], { from: 'user' })

    expect(deps.createFleetHandler.execute).toHaveBeenCalledWith(
      expect.objectContaining({})
    )

    expect(log).toHaveBeenCalledWith('generated-id')
  })

  it('register-vehicle: registers the vehicle and prints a confirmation', async () => {
    const deps = buildDeps()
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})

    await buildProgram(deps).parseAsync(['register-vehicle', 'fleet-1', 'AB-123-CD'], { from: 'user' })

    expect(deps.registerVehicleHandler.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        fleetId: expect.objectContaining({}),
        vehicleId: expect.objectContaining({}),
      }),
    )
    expect(log).toHaveBeenCalledWith(expect.stringContaining('AB-123-CD'))
  })

  it('localize-vehicle: parks the vehicle at the given coordinates', async () => {
    const deps = buildDeps()
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})

    await buildProgram(deps).parseAsync(['localize-vehicle', 'fleet-1', 'AB-123-CD', '48.8566', '2.3522'], {
      from: 'user',
    })

    const command = (deps.parkVehicleHandler.execute as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(command.location.getLatitude()).toBe(48.8566)
    expect(command.location.getLongitude()).toBe(2.3522)
    expect(log).toHaveBeenCalledWith(expect.stringContaining('AB-123-CD'))
  })

  it('prints the error message and sets a non-zero exit code when the handler rejects', async () => {
    const deps = buildDeps({
      registerVehicleHandler: {
        execute: vi.fn().mockRejectedValue(new FleetNotFoundError(FleetId.from('unknown'))),
      } as never,
    })
    vi.spyOn(console, 'log').mockImplementation(() => {})
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    await buildProgram(deps).parseAsync(['register-vehicle', 'unknown', 'AB-123-CD'], { from: 'user' })

    expect(error).toHaveBeenCalledWith('Fleet with ID unknown was not found.')
    expect(process.exitCode).toBe(1)
  })
})
