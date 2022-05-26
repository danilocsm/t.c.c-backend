import { Activity } from "@prisma/client";
import { prisma } from "../../prisma";
import {
  ActivityCreateData,
  ActivityRepository,
} from "../../repositories/activities.repository";

export class ActivityRepositoryImpl implements ActivityRepository {
  async create({
    description,
    difficulty,
    itemsId,
    illnessesId,
    images,
  }: ActivityCreateData): Promise<Activity> {
    const newActivity = await prisma.activity.create({
      data: { description, difficulty, itemsId, illnessesId, images },
    });
    return newActivity;
  }

  async update(id: string, newData: ActivityCreateData): Promise<Activity> {
    const updatedItem = await prisma.activity.update({
      data: newData,
      where: { id: id },
    });
    return updatedItem;
  }

  async delete(id: string): Promise<void> {
    await prisma.activity.delete({ where: { id: id } });
  }

  async getAll(): Promise<Activity[]> {
    const allActivities = await prisma.activity.findMany();
    return allActivities;
  }

  async getById(id: string): Promise<Activity | null> {
    const targetActivity = await prisma.activity.findUnique({
      where: { id: id },
    });
    return targetActivity;
  }

  async addItem(id: string, itemId: string): Promise<void> {
    const targetItem = await prisma.item.findUnique({
      where: { id: itemId },
    });
    const targetActivity = await prisma.activity.findUnique({
      where: { id: id },
    });

    if (targetItem == null) throw new Error();
    if (targetActivity == null) throw new Error();

    targetActivity.itemsId.push(itemId);
    await prisma.activity.update({
      data: { itemsId: targetActivity.itemsId },
      where: { id: id },
    });
  }

  async addIllness(id: string, illnessId: string): Promise<void> {
    const targetIllness = await prisma.illness.findUnique({
      where: { id: illnessId },
    });
    const targetActivity = await prisma.activity.findUnique({
      where: { id: id },
    });

    if (targetIllness == null) throw new Error();
    if (targetActivity == null) throw new Error();

    targetActivity.illnessesId.push(illnessId);
    await prisma.activity.update({
      data: { illnessesId: targetActivity.illnessesId },
      where: { id: id },
    });
  }

  async addImage(id: string, image: string): Promise<void> {
    const targetActivity = await prisma.activity.findUnique({
      where: { id: id },
    });

    if (targetActivity == null) throw new Error();

    targetActivity.images.push(image);
    await prisma.activity.update({
      data: { images: targetActivity.images },
      where: { id: id },
    });
  }
}
