import { ItemCreateData } from "../repositories/items.repository";
import { ItemsRepositoryImpl } from "../services/items.service";

export class ItemsController {
  constructor(private itemsService: ItemsRepositoryImpl) {}

  async createItem(newItem: ItemCreateData) {
    const itemCreated = await this.itemsService.create(newItem);
    return itemCreated;
  }

  async getUnique(itemId: string) {
    const itemRetrieved = await this.itemsService.getById(itemId);
    return itemRetrieved;
  }

  async getAllItems() {
    const allItems = await this.itemsService.getAll();
    return allItems;
  }

  async updateItem(itemId: string, newData: ItemCreateData) {
    const itemUpdated = await this.itemsService.update(itemId, newData);
    return itemUpdated;
  }

  async deleteItem(itemId: string) {
    await this.itemsService.delete(itemId);
  }

  async addActivityToItem(itemId: string, activityId: string) {
    await this.itemsService.addActivity(activityId, itemId);
  }
}
