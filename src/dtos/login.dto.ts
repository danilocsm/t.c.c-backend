import { Contains, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
  @IsString({ message: "Invalid email address" })
  @IsNotEmpty()
  @Contains("@", { message: "Invalid email address" })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
