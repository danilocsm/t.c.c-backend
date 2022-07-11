import { ActivityItem, Difficulty } from "@prisma/client";
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

  @IsNotEmpty()
  items: ActivityItem[];

  @ValidateIf((obj) => obj.image != undefined)
  @IsString({ each: true, message: "Image must be string." })
  image?: string;

  constructor(
    name: string,
    description: string,
    observations: string,
    difficulty: Difficulty,
    items: ActivityItem[],
    illnesses: string,
    image: string
  ) {
    this.name = name;
    this.description = description;
    this.observations = observations;
    this.difficulty = difficulty;
    this.items = items;
    this.illnesses = illnesses;
    this.image = image;
  }
}
