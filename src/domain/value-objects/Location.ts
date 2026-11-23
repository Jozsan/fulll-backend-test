import { InvalidLatitudeError } from '../errors/InvalidLatitudeError'
import { InvalidLongitudeError } from '../errors/InvalidLongitudeError'

export class Location {

  private readonly latitude: number
  private readonly longitude: number

  private constructor(props: LocationProps) {
    this.latitude = props.latitude
    this.longitude = props.longitude
  }

  static from(props: LocationProps): Location {

    Location.validateProps(props)

    return new Location(props)
  }

  getLatitude(): number {
    return this.latitude
  }

  getLongitude(): number {
    return this.longitude
  }

  private static validateProps(props: LocationProps) {

    if (Number.isNaN(props.latitude)) throw new InvalidLatitudeError(props.latitude)
    if (Number.isNaN(props.longitude)) throw new InvalidLongitudeError(props.longitude)

    if (props.latitude < -90 || props.latitude > 90)  throw new InvalidLatitudeError(props.latitude)
    if (props.longitude < -180 || props.longitude > 180) throw new InvalidLongitudeError(props.longitude)
  }

  equals(other: Location) {
    return this.latitude === other.latitude && this.longitude === other.longitude
  }
}

export interface LocationProps {
  latitude: number
  longitude: number
}