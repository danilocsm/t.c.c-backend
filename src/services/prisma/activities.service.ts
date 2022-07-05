import { Activity } from "@prisma/client";
import { ActivityDTO } from "../../dtos/activity.dto";
import {
  ActivityAlreadyExistsError,
  ActivityNotFoundError,
} from "../../errors/activity.error";
import { IllnessNotFoundError } from "../../errors/illness.error";
import { ItemNotFoundError } from "../../errors/items.error";
import { prisma } from "../../prisma";
import { ActivityRepository } from "../../repositories/activities.repository";

export class ActivityRepositoryImpl implements ActivityRepository {
  async create({
    name,
    description,
    difficulty,
    itemsId,
    illnessesId,
    images,
  }: ActivityDTO): Promise<Activity> {
    const activity = await prisma.activity.findUnique({
      where: { name: name },
    });

    if (activity != null) throw new ActivityAlreadyExistsError(activity.name);

    const newActivity = await prisma.activity.create({
      data: { name, description, difficulty, itemsId, illnessesId, images },
    });
    return newActivity;
  }

  async update(id: string, newData: ActivityDTO): Promise<Activity> {
    const activityExists = await prisma.activity.findUnique({
      where: { id: id },
    });

    if (activityExists == null) throw new ActivityNotFoundError(id);

    const updatedActivity = await prisma.activity.update({
      data: newData,
      where: { id: id },
    });
    return updatedActivity;
  }

  async delete(id: string): Promise<void> {
    const activityExists = await prisma.activity.findUnique({
      where: { id: id },
    });

    if (activityExists == null) throw new ActivityNotFoundError(id);

    await prisma.activity.delete({ where: { id: id } });
  }

  async getAll(): Promise<Activity[]> {
    const allActivities = await prisma.activity.findMany();
    return allActivities;
  }

  async getById(id: string): Promise<Activity> {
    const targetActivity = await prisma.activity.findUnique({
      where: { id: id },
    });

    if (targetActivity == null) throw new ActivityNotFoundError(id);

    return targetActivity;
  }

  async getByName(name: string): Promise<Activity> {
    const targetActivity = await prisma.activity.findUnique({
      where: { name: name },
    });

    if (targetActivity == null) throw new ActivityNotFoundError(name);

    return targetActivity;
  }

  async addItem(id: string, itemId: string): Promise<void> {
    const targetItem = await prisma.item.findUnique({
      where: { id: itemId },
    });
    const targetActivity = await prisma.activity.findUnique({
      where: { id: id },
    });

    if (targetItem == null) throw new ItemNotFoundError(itemId);
    if (targetActivity == null) throw new ActivityNotFoundError(id);

    targetActivity.itemsId.push(itemId);
    await prisma.activity.update({
      data: { itemsId: targetActivity.itemsId },
      where: { id: id },
    });
  }

  async addIllness(id: string, illnessId: string): Promise<void> {
    const targetIllness = await prisma.illness.findUnique({
      where: { id: illnessId },
      rejectOnNotFound: true,
    });
    const targetActivity = await prisma.activity.findUnique({
      where: { id: id },
      rejectOnNotFound: true,
    });

    if (targetIllness == null) throw new IllnessNotFoundError(id);
    if (targetActivity == null) throw new ActivityNotFoundError(id);

    targetActivity.illnessesId.push(illnessId);
    await prisma.activity.update({
      data: { illnessesId: targetActivity.illnessesId },
      where: { id: id },
    });
  }

  async addImage(id: string, image: string): Promise<void> {
    const targetActivity = await prisma.activity.findUnique({
      where: { id: id },
      rejectOnNotFound: true,
    });

    if (targetActivity == null) throw new ActivityNotFoundError(id);

    targetActivity.images.push(image);
    await prisma.activity.update({
      data: { images: targetActivity.images },
      where: { id: id },
    });
  }
}
