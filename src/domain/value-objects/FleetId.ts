import { InvalidFleetIdError } from '../errors/InvalidFleetIdError'

export class FleetId {
  private readonly id: string

  private constructor(props: FleetIdProps) {
    FleetId.validateProps(props)
    this.id = props.id
  }

  static from(id: string): FleetId {
    FleetId.validateProps({ id })
    return new FleetId({ id })
  }

  asString(): string {
    return this.id
  }

  private static validateProps(props: FleetIdProps) {
    if (!props.id || props.id.trim() === '') {
      throw new InvalidFleetIdError(props.id)
    }
  }

  equals(other: FleetId): boolean {
    return this.id === other.asString()
  }
}

export interface FleetIdProps {
  id: string
}