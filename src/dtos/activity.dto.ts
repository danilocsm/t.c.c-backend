import { Difficulty } from "@prisma/client";
import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class ActivityDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  observations: string;

  @IsNotEmpty()
  @IsString()
  difficulty: Difficulty;

  @IsString({ each: true })
  illnesses: string;

  @ValidateIf((obj) => obj.itemsId != undefined)
  @IsString({ each: true })
  itemsId?: string[];

  @ValidateIf((obj) => obj.image != undefined)
  @IsString({ each: true, message: "Image must be string." })
  image?: string;

  constructor(
    name: string,
    description: string,
    observations: string,
    difficulty: Difficulty,
    itemsId: string[],
    illnesses: string,
    image: string
  ) {
    this.name = name;
    this.description = description;
    this.observations = observations;
    this.difficulty = difficulty;
    this.itemsId = itemsId;
    this.illnesses = illnesses;
    this.image = image;
  }
}
