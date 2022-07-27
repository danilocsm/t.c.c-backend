import { Item } from "@prisma/client";
import { ItemDTO } from "../dtos/item.dto";

export interface ItemsRepository {
  create(item: ItemDTO): Promise<Item>;
  update(id: string, newData: ItemDTO): Promise<Item>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Item[]>;
  getById(id: string): Promise<Item>;
  getWithFilter(filter: string): Promise<Item[]>;
  addActivities(itemId:string, activitiesId: string[]): Promise<void>;
}
