import { buildProgram } from './program'
import { createCliDependencies } from './dependencies'
import { closePostgresConnection } from '../persistence/postgres/client'

buildProgram(createCliDependencies())
  .parseAsync(process.argv)
  .finally(() => closePostgresConnection())
