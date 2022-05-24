import { prisma } from "../prisma";
import {
  ItemCreateData,
  ItemsRepository,
} from "../repositories/items.repository";

export class ItemsRepositoryImpl implements ItemsRepository {
  async create({ name, price, link, itemType }: ItemCreateData) {
    const itemCreated = await prisma.item.create({
      data: { name: name, price: price, link: link, itemType: itemType },
    });
    return itemCreated;
  }

  async update(id: string, newData: ItemCreateData) {
    const itemUpdated = await prisma.item.update({
      data: newData,
      where: { id: id },
    });
    return itemUpdated;
  }

  async delete(id: string) {
    await prisma.item.delete({ where: { id: id } });
  }

  async getAll() {
    const allItems = await prisma.item.findMany();
    return allItems;
  }

  async getById(id: string) {
    const recoveredItem = await prisma.item.findUnique({ where: { id: id } });
    return recoveredItem;
  }

  async addActivity(itemId: string, activityId: string) {
    const targetItem = await prisma.item.findUnique({ where: { id: itemId } });
    if (targetItem) {
      targetItem.activitiesId.push(activityId);
      await prisma.item.update({
        data: { activitiesId: targetItem.activitiesId },
        where: { id: itemId },
      });
    }
  }
}
