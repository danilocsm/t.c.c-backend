import { Illness } from "@prisma/client";
import { prisma } from "../prisma";
import {
  IllnessCreateData,
  IllnessRepository,
} from "../repositories/illness.repository";

export class IllnessRepositoryImpl implements IllnessRepository {
  async create({
    name,
    description,
    symptoms,
    levelOfAttention,
  }: IllnessCreateData): Promise<Illness> {
    const newItem = await prisma.illness.create({
      data: { name, description, symptoms, levelOfAttention },
    });
    return newItem;
  }

  async update(id: string, newData: IllnessCreateData): Promise<Illness> {
    const updatedItem = await prisma.illness.update({
      data: newData,
      where: { id: id },
    });
    return updatedItem;
  }

  async delete(id: string): Promise<void> {
    await prisma.illness.delete({ where: { id: id } });
  }

  async getAll(): Promise<Illness[]> {
    const allIllnesses = await prisma.illness.findMany();
    return allIllnesses;
  }

  async getById(id: string): Promise<Illness | null> {
    const targetIllness = await prisma.illness.findUnique({
      where: { id: id },
    });
    return targetIllness;
  }

  async addActivity(id: string, activityId: string): Promise<void> {
    const targetIllness = await prisma.illness.findUnique({
      where: { id: id },
    });
    const targetActivity = await prisma.activity.findUnique({
      where: { id: activityId },
    });

    if (targetIllness == null) return;
    if (targetActivity == null) return;

    targetIllness.activitiesId.push(activityId);
    await prisma.illness.update({
      data: { activitiesId: targetIllness.activitiesId },
      where: { id: id },
    });
  }
}
