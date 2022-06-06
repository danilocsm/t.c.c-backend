import { LevelOfAttention } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";
import { IllnessCreateData } from "../repositories/illness.repository";

export class IllnessDTO implements IllnessCreateData {
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

  @IsString({ each: true })
  activitiesId: string[];

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
