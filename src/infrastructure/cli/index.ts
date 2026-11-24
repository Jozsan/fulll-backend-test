import { buildProgram } from './program'
import { createCliDependencies } from './dependencies'

buildProgram(createCliDependencies()).parseAsync(process.argv)
