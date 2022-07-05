import { Role } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail({ message: "Invalid email address" })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @ValidateIf((obj) => obj.role !== undefined)
  @IsString()
  role?: Role;

  @ValidateIf((obj) => obj.picture !== undefined)
  @IsString()
  picture?: string;

  constructor(
    username: string,
    email: string,
    password: string,
    role: Role,
    picture: string
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.picture = picture;
  }
}
