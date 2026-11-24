import { VehicleId } from '../value-objects/VehicleId'
import { Location } from '../value-objects/Location'
import { VehicleAlreadyParkedAtLocationError } from '../errors/VehicleAlreadyParkedAtLocationError'

export class Vehicle {
  private readonly id: VehicleId
  private location: Location | null

  private constructor(props: VehicleProps) {
    this.id = props.id
    this.location = props.location
  }

  static from(props: VehicleProps): Vehicle {
    return new Vehicle(props)
  }

  getId(): VehicleId {
    return this.id
  }

  getIdAsString(): string {
    return this.id.asString()
  }

  parkAt(location: Location): void {
    if (this.location?.equals(location)) throw new VehicleAlreadyParkedAtLocationError(this.id)

    this.location = location
  }

  getLocation(): Location | null {
    return this.location
  }
}

export interface VehicleProps {
  id: VehicleId
  location: Location | null
}