import { InvalidUserIdError } from '../errors/InvalidUserIdError'

export class UserId {
  private readonly id: string

  private constructor(props: UserIdProps) {
    this.id = props.id
  }

  static from(id: string): UserId {
    UserId.validateProps({ id })
    return new UserId({ id })
  }

  asString(): string {
    return this.id
  }

  private static validateProps(props: UserIdProps) {
    if (!props.id || props.id.trim() === '') {
      throw new InvalidUserIdError(props.id)
    }
  }

  equals(other: UserId): boolean {
    return this.id === other.asString()
  }
}

export interface UserIdProps {
  id: string
}
