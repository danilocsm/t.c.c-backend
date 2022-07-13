import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class QuestionDTO {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  contactEmail: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  isAnswered?: boolean;

  constructor(name: string, contactEmail: string, text: string, isAnswered: boolean = false) {
    this.name = name;
    this.contactEmail = contactEmail;
    this.text = text;
    this.isAnswered = isAnswered;
  }
}
