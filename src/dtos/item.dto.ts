import { ItemType } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export class ItemDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  itemType: ItemType;

  @ValidateIf((obj) => obj.link !== undefined)
  @IsString()
  link?: string;

  @ValidateIf((obj) => obj.activitiesId !== undefined)
  @IsString({ each: true })
  activitiesId?: string[];

  constructor(
    name: string,
    price: number,
    itemType: ItemType,
    link: string,
    activitiesId: string[]
  ) {
    this.name = name;
    this.price = price;
    this.itemType = itemType;
    this.link = link;
    this.activitiesId = activitiesId;
  }
}
