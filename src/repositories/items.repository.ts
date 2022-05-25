import { Item, ItemType } from "@prisma/client";

export interface ItemCreateData {
    name: string;
    price: number;
    link?: string;
    itemType: ItemType;
}

export interface ItemsRepository {
    create: (item: ItemCreateData) => Promise<Item>;
    update: (id: string, newData: ItemCreateData) => Promise<Item>;
    delete: (id: string) => Promise<void>;
    getAll: () => Promise<Item[]>;
    getById: (id: string) => Promise<Item|null>;
    addActivity: (activityId: string, itemId: string) => Promise<void>;
}