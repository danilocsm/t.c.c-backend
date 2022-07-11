import { Item, ItemType } from "@prisma/client";
import { ItemDTO } from "../../dtos/item.dto";
import { ActivityNotFoundError } from "../../errors/activity.error";
import {
  ItemAlreadyExistsError,
  ItemNotFoundError,
} from "../../errors/items.error";
import { prisma } from "../../prisma";
import { ItemsRepository } from "../../repositories/items.repository";

export class ItemsRepositoryImpl implements ItemsRepository {
  async create({
    name,
    price,
    link,
    itemType,
    imageUrl,
  }: ItemDTO): Promise<Item> {
    const itemExists = await prisma.item.findUnique({ where: { name: name } });

    if (itemExists != null) throw new ItemAlreadyExistsError(name);

    const itemCreated = await prisma.item.create({
      data: {
        name: name,
        price: price,
        link: link,
        itemType: itemType,
        imageUrl: imageUrl,
      },
    });
    return itemCreated;
  }

  async update(id: string, newData: ItemDTO): Promise<Item> {
    const itemExists = await prisma.item.findUnique({ where: { id: id } });

    if (itemExists == null) throw new ItemNotFoundError(id);

    const itemUpdated = await prisma.item.update({
      data: newData,
      where: { id: id },
    });
    return itemUpdated;
  }

  async delete(id: string): Promise<void> {
    const itemExists = await prisma.item.findUnique({ where: { id: id } });

    if (itemExists == null) throw new ItemNotFoundError(id);

    await prisma.item.delete({ where: { id: id } });
  }

  async getAll(): Promise<Item[]> {
    const allItems = await prisma.item.findMany();
    return allItems;
  }

  async getById(id: string): Promise<Item> {
    const recoveredItem = await prisma.item.findUnique({ where: { id: id } });

    if (recoveredItem == null) throw new ItemNotFoundError(id);

    return recoveredItem;
  }

  async getWithFilter(filter: ItemType): Promise<Item[]> {
    const recoverdedItems = await prisma.item.findMany({
      where: { itemType: filter },
    });

    return recoverdedItems;
  }
}
