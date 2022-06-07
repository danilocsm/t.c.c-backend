import { LevelOfAttention } from "@prisma/client";
import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class IllnessDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString({ each: true, message: "All fields must be strings" })
  @IsNotEmpty()
  symptoms: string[];

  @IsString()
  @IsNotEmpty()
  levelOfAttention: LevelOfAttention;

  @ValidateIf((obj) => obj.activitiesId !== undefined)
  @IsString({ each: true })
  activitiesId?: string[];

  constructor(
    name: string,
    description: string,
    symptoms: string[],
    levelOfAttention: LevelOfAttention,
    activitiesId: string[]
  ) {
    this.name = name;
    this.description = description;
    this.symptoms = symptoms;
    this.levelOfAttention = levelOfAttention;
    this.activitiesId = activitiesId;
  }
}
