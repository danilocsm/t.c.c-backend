import { Activity, Difficulty } from "@prisma/client";

export interface ActivityCreateData {
  description: string;
  difficulty: Difficulty;
  itemsId?: string[];
  illnessesId?: string[];
  images?: string[];
}

export interface ActivityRepository {
  create(activity: ActivityCreateData): Promise<Activity>;
  update(id: string, newData: ActivityCreateData): Promise<Activity>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Activity[]>;
  getById(id: string): Promise<Activity | null>;
  addItem(id: string, itemId: string): Promise<void>;
  addIllness(id: string, illnessId: string): Promise<void>;
  addImage(id: string, image: string): Promise<void>;
}
