import 'dotenv/config'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { db, closePostgresConnection } from './client'

migrate(db, { migrationsFolder: './src/infrastructure/persistence/postgres/migrations' })
  .then(() => console.log('Migrations applied successfully.'))
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => closePostgresConnection())
