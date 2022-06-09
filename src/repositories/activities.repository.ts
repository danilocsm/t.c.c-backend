import { Activity } from "@prisma/client";
import { ActivityDTO } from "../dtos/activity.dto";

export interface ActivityRepository {
  create(activity: ActivityDTO): Promise<Activity>;
  update(id: string, newData: ActivityDTO): Promise<Activity>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Activity[]>;
  getById(id: string): Promise<Activity>;
  addItem(id: string, itemId: string): Promise<void>;
  addIllness(id: string, illnessId: string): Promise<void>;
  addImage(id: string, image: string): Promise<void>;
}
