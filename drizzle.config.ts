import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/infrastructure/persistence/postgres/schema.ts',
  out: './src/infrastructure/persistence/postgres/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
})
