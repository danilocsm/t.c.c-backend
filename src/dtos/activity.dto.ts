import { ActivityItem, Difficulty } from "@prisma/client";
import { Type } from "class-transformer";
import { IsBase64, IsNotEmpty, IsString, ValidateIf, ValidateNested } from "class-validator";
import { ActivityItemDTO } from "./activityItem.dto";

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

  @ValidateNested({each: true})
  @Type(() => ActivityItemDTO)
  @IsNotEmpty()
  items: ActivityItem[];

  @ValidateIf((obj) => obj.image != undefined)
  @IsString({ each: true, message: "Image must be string." })
  @IsBase64()
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
