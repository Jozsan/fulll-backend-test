import { pgTable, text, doublePrecision, primaryKey } from 'drizzle-orm/pg-core'

export const fleets = pgTable('fleets', {
  id: text('id').primaryKey(),
  ownerId: text('owner_id').notNull(),
})

export const vehicles = pgTable('vehicles', {
  id: text('id').primaryKey(),
  latitude: doublePrecision('latitude'),
  longitude: doublePrecision('longitude'),
})

export const fleetVehicles = pgTable(
  'fleet_vehicles',
  {
    fleetId: text('fleet_id')
      .notNull()
      .references(() => fleets.id, { onDelete: 'cascade' }),
    vehicleId: text('vehicle_id')
      .notNull()
      .references(() => vehicles.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.fleetId, table.vehicleId] })],
)
