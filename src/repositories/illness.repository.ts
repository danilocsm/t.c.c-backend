import { Illness, LevelOfAttention } from "@prisma/client";
import { IllnessDTO } from "../dtos/illness.dto";

export interface IllnessRepository {
  create(illness: IllnessDTO): Promise<Illness>;
  update(id: string, newData: IllnessDTO): Promise<Illness>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Illness[]>;
  getById(id: string): Promise<Illness | null>;
  addActivity(id: string, activityId: string): Promise<void>;
}
