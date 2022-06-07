import { IsNotEmpty, IsString } from "class-validator";

export class TestimonialDTO {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  constructor(text: string, author: string) {
    this.text = text;
    this.author = author;
  }
}
