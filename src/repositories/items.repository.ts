export interface ItemData {
    name: String;
    price: Number;
    link?: String;
}

export interface ItemsRepository {
    create: (item: ItemData) => Promise<void>;
    update: (id: Number) => Promise<void>;
    delete: (id: Number) => Promise<void>;
    getById: (id: Number) => Promise<Object[]>;
    getAll: () => Promise<Object[]>;
}