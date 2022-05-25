import { Illness, LevelOfAttention } from "@prisma/client";

export interface IllnessCreateData {
    name: string;
    description: string;
    symptoms: string[];
    levelOfAttention: LevelOfAttention;
}

export interface IllnessRepository {
    create(illness: IllnessCreateData ): Promise<Illness>;
    update(id:string, newData: IllnessCreateData ): Promise<Illness>;
    delete(id:string): Promise<void>;
    getAll(): Promise<Illness[]>;
    getById(id:string): Promise<Illness|null>;
    addActivity(id:string, activityId:string): Promise<void>;
}