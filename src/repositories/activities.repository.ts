import { Activity, Illness, Item } from "@prisma/client";
import { ActivityDTO } from "../dtos/activity.dto";

export interface ActivityRepository {
  create(activity: ActivityDTO): Promise<Activity>;
  update(id: string, newData: ActivityDTO): Promise<Activity>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Activity[]>;
  getById(id: string): Promise<Activity>;
  getByName(name: string): Promise<Activity>;
  getActivityObjects(name: string): Promise<Item[]>;
  getActivityIllnesses(name: string): Promise<Illness[]>;
  addItem(id: string, itemId: string): Promise<void>;
  addIllness(id: string, illnessId: string): Promise<void>;
  addImage(id: string, image: string): Promise<void>;
}
