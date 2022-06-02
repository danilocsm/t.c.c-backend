import { Difficulty } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";
import { ActivityCreateData } from "../repositories/activities.repository";

export class ActivityDTO implements ActivityCreateData {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  difficulty: Difficulty;

  @IsString({each: true})
  itemsId?: string[] | undefined;
  
  @IsString({each: true})
  illnessesId?: string[] | undefined;

  @IsString({each: true})
  images?: string[] | undefined;

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
