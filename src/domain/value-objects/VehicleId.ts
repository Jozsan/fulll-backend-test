import { InvalidVehicleIdError } from '../errors/InvalidVehicleIdError'

export class VehicleId {

  private static readonly regex = /^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/
  private readonly id: string

  private constructor(props: VehicleIdProps) {
    this.id = props.id
  }

  static from(id: string) {
    VehicleId.validateProps({ id })
    return new VehicleId({ id })
  }

  getId(): string {
    return this.id
  }

  asString(): string {
    return this.id
  }

  private static validateProps(props: VehicleIdProps) {
    if (!this.regex.test(props.id)) {
      throw new InvalidVehicleIdError(props.id)
    }
  }

  equals(other: VehicleId) {
    return this.id === other.id
  }
}

export interface VehicleIdProps {
  id: string
}