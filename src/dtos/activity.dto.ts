import { Difficulty } from "@prisma/client";
import { IsEmpty, IsNotEmpty, IsString, ValidateIf } from "class-validator";
import { ActivityCreateData } from "../repositories/activities.repository";

export class ActivityDTO implements ActivityCreateData {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  difficulty: Difficulty;

  @ValidateIf((obj) => obj.itemsId != undefined)
  @IsString({ each: true })
  itemsId?: string[];

  @ValidateIf((obj) => obj.illnessesId != undefined)
  @IsString({ each: true })
  illnessesId?: string[];

  @ValidateIf((obj) => obj.images != undefined)
  @IsString({ each: true, message: "All images must be strings." })
  images?: string[];

  constructor(
    name: string,
    description: string,
    difficulty: Difficulty,
    itemsId: string[],
    illnessesId: string[],
    images: string[]
  ) {
    this.name = name;
    this.description = description;
    this.difficulty = difficulty;
    this.itemsId = itemsId;
    this.illnessesId = illnessesId;
    this.images = images;
  }
}
