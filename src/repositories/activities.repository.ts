import { Activity, ActivityItem, Item } from "@prisma/client";
import { ActivityDTO } from "../dtos/activity.dto";

export interface ActivityRepository {
  create(activity: ActivityDTO): Promise<Activity>;
  update(id: string, newData: ActivityDTO): Promise<Activity>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Activity[]>;
  getById(id: string): Promise<Activity>;
  getByName(name: string): Promise<Activity>;
  getActivityItems(name: string): Promise<ActivityItem[]>;
  getActivityIllnesses(name: string): Promise<string>;
  addItem(id: string, item: ActivityItem): Promise<void>;
  addImage(id: string, image: string): Promise<void>;
}
