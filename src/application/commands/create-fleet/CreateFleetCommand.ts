import { UserId } from '../../../domain/value-objects/UserId'

export class CreateFleetCommand {
  constructor(readonly userId: UserId) {}
}
