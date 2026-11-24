import { Fleet } from '../entities/Fleet'

export interface ISaveFleet {
  save(fleet: Fleet): Promise<void>
}