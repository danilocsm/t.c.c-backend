import { IsNotEmpty, IsString } from "class-validator";

export class QuestionDTO {
  @IsString()
  @IsNotEmpty()
  contactEmail: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  constructor(contactEmail: string, text: string) {
    this.contactEmail = contactEmail;
    this.text = text;
  }
}
