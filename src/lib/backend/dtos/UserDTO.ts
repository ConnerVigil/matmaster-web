export class UserDTO {
  readonly firstName: string;
  readonly lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public static fromDTO(user: UserDTO): User {
    return new User(user.firstName, user.lastName);
  }
}
