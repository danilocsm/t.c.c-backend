import { Activity, ActivityItem } from "@prisma/client";
import { ActivityDTO } from "../../dtos/activity.dto";
import {
  ActivityAlreadyExistsError,
  ActivityNotFoundError,
} from "../../errors/activity.error";
import { prisma } from "../../prisma";
import { ActivityRepository } from "../../repositories/activities.repository";

export class ActivityRepositoryImpl implements ActivityRepository {
  async create({
    name,
    description,
    observations,
    difficulty,
    items,
    illnesses,
    image,
  }: ActivityDTO): Promise<Activity> {
    name = name.toLowerCase();
    const activity = await prisma.activity.findUnique({
      where: { name: name },
    });

    if (activity != null) throw new ActivityAlreadyExistsError(activity.name);

    const newActivity = await prisma.activity.create({
      data: {
        name,
        description,
        observations,
        difficulty,
        items,
        illnesses,
        image,
      },
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

    await prisma.activity.delete({ where: { id: activityExists.id } });
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

  async getActivityItems(name: string): Promise<ActivityItem[]> {
    const targetActivity = await prisma.activity.findUnique({
      where: { name: name },
    });

    if (targetActivity == null) throw new ActivityNotFoundError(name);

    return targetActivity.items;
  }

  async getActivityIllnesses(name: string): Promise<string> {
    const targetActivity = await prisma.activity.findUnique({
      where: { name: name },
    });

    if (targetActivity == null) throw new ActivityNotFoundError(name);

    return targetActivity.illnesses;
  }

  async addItem(id: string, item: ActivityItem): Promise<void> {
    const targetActivity = await prisma.activity.findUnique({
      where: { id: id },
    });

    if (targetActivity == null) throw new ActivityNotFoundError(id);

    targetActivity.items.push(item);
    await prisma.activity.update({
      data: { items: targetActivity.items },
      where: { id: id },
    });
  }

  async addImage(id: string, image: string): Promise<void> {
    const targetActivity = await prisma.activity.findUnique({
      where: { id: id },
      rejectOnNotFound: true,
    });

    if (targetActivity == null) throw new ActivityNotFoundError(id);

    await prisma.activity.update({
      data: { image: image },
      where: { id: id },
    });
  }
}
