import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class QuestionDTO {
  @IsNotEmpty()
  @IsEmail()
  contactEmail: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  constructor(contactEmail: string, text: string) {
    this.contactEmail = contactEmail;
    this.text = text;
  }
}
