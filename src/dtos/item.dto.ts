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

  @ValidateIf((obj) => obj.imageUrl !== undefined)
  @IsString()
  imageUrl?: string;

  constructor(
    name: string,
    price: number,
    itemType: ItemType,
    link: string,
    imageUrl: string,
    activitiesId: string[]
  ) {
    this.name = name;
    this.price = price;
    this.itemType = itemType;
    this.link = link;
    this.imageUrl = imageUrl;
    this.activitiesId = activitiesId;
  }
}
