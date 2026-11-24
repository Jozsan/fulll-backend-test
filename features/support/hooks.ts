import { Before, AfterAll } from '@cucumber/cucumber'
import { sql } from 'drizzle-orm'
import { usesPostgres } from './world'
import { db, closePostgresConnection } from '../../src/infrastructure/persistence/postgres/client'

Before(async function () {
  if (!usesPostgres) return

  await db.execute(sql`TRUNCATE TABLE fleet_vehicles, fleets, vehicles RESTART IDENTITY CASCADE`)
})

AfterAll(async function () {
  if (!usesPostgres) return

  await closePostgresConnection()
})
