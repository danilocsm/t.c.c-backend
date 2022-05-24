export interface ItemCreateData {
    name: string;
    price: number;
    link?: string;
    itemType: number;
}

export interface ItemsRepository {
    create: (item: ItemCreateData) => Promise<Object>;
    update: (id: string, newData: ItemCreateData) => Promise<Object>;
    delete: (id: string) => Promise<void>;
    getAll: () => Promise<Object[]>;
    getById: (id: string) => Promise<Object|null>;
    addActivity: (activityId: string, itemId: string) => Promise<void>;
}