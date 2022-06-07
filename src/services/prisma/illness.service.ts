import { Illness } from "@prisma/client";
import { IllnessDTO } from "../../dtos/illness.dto";
import { ActivityNotFoundError } from "../../errors/activity.error";
import {
  IllnessAlreadyExistsError,
  IllnessNotFoundError,
} from "../../errors/illness.error";
import { prisma } from "../../prisma";
import { IllnessRepository } from "../../repositories/illness.repository";

export class IllnessRepositoryImpl implements IllnessRepository {
  async create({
    name,
    description,
    symptoms,
    levelOfAttention,
  }: IllnessDTO): Promise<Illness> {
    const illnessExists = await prisma.illness.findUnique({
      where: { name: name },
    });

    if (illnessExists != null)
      throw new IllnessAlreadyExistsError(illnessExists.name);

    const newItem = await prisma.illness.create({
      data: { name, description, symptoms, levelOfAttention },
    });
    return newItem;
  }

  async update(id: string, newData: IllnessDTO): Promise<Illness> {
    const illnessExists = await prisma.illness.findUnique({
      where: { id: id },
    });

    if (illnessExists == null) throw new IllnessNotFoundError(id);

    const updatedItem = await prisma.illness.update({
      data: newData,
      where: { id: id },
    });
    return updatedItem;
  }

  async delete(id: string): Promise<void> {
    const illnessExists = await prisma.illness.findUnique({
      where: { id: id },
    });

    if (illnessExists == null) throw new IllnessNotFoundError(id);

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

    if (targetIllness == null) throw new IllnessNotFoundError(id);

    return targetIllness;
  }

  async addActivity(id: string, activityId: string): Promise<void> {
    const targetActivity = await prisma.activity.findUnique({
      where: { id: activityId },
    });
    const targetIllness = await prisma.illness.findUnique({
      where: { id: id },
    });

    if (targetActivity == null) throw new ActivityNotFoundError(activityId);
    if (targetIllness == null) throw new IllnessNotFoundError(id);

    targetIllness.activitiesId.push(activityId);
    await prisma.illness.update({
      data: { activitiesId: targetIllness.activitiesId },
      where: { id: id },
    });
  }
}
