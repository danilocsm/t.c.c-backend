import { Item } from "@prisma/client";
import { ActivityNotFoundError } from "../../errors/activity.error";
import { ItemAlreadyExistsError, ItemNotFoundError } from "../../errors/items.error";
import { prisma } from "../../prisma";
import {
  ItemCreateData,
  ItemsRepository,
} from "../../repositories/items.repository";

export class ItemsRepositoryImpl implements ItemsRepository {
  async create({ name, price, link, itemType }: ItemCreateData): Promise<Item> {
    const itemExists = await prisma.item.findUnique({ where: { name: name } });

    if (itemExists != null) throw new ItemAlreadyExistsError(name);

    const itemCreated = await prisma.item.create({
      data: { name: name, price: price, link: link, itemType: itemType },
    });
    return itemCreated;
  }

  async update(id: string, newData: ItemCreateData): Promise<Item> {
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

  async addActivity(itemId: string, activityId: string): Promise<void> {
    const targetItem = await prisma.item.findUnique({
      where: { id: itemId },
    });
    const targetActivity = await prisma.activity.findUnique({
      where: { id: activityId },
    });

    if ( targetItem == null) throw new ItemNotFoundError(itemId);
    if ( targetActivity == null) throw new ActivityNotFoundError(activityId);

    targetItem.activitiesId.push(activityId);
    await prisma.illness.update({
      data: { activitiesId: targetItem.activitiesId },
      where: { id: itemId },
    });
  }
}
