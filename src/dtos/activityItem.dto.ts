import { IsBase64, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class ActivityItemDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @ValidateIf((obj) => obj.image !== undefined)
  @IsNotEmpty()
  @IsString()
  @IsBase64()
  image: string;

  constructor(name: string, description: string, image: string) {
    this.name = name;
    this.description = description;
    this.image = image;
  }
}
