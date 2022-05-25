import { Request, Response } from "express";
import { ItemCreateData } from "../repositories/items.repository";
import { ItemsRepositoryImpl } from "../services/prisma/items.service";

export class ItemsController {
  constructor(private readonly itemsService: ItemsRepositoryImpl) {}

  async createItem(req: Request, res: Response) {
    const { name, price, link, itemType } = req.body;
    try {
      const newItem = await this.itemsService.create({
        name,
        price,
        link,
        itemType,
      });
      return res.status(201).json(newItem);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error creating new item`, error: err });
    }
  }

  async getUnique(req: Request, res: Response) {
    const itemId = req.params.id;
    try {
      const itemRetrieved = await this.itemsService.getById(itemId);
      return res.status(201).json(itemRetrieved);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error retrieving item ${itemId}`, error: err });
    }
  }

  async getAllItems(req: Request, res: Response) {
    try {
      const allItems = await this.itemsService.getAll();
      return res.status(201).json(allItems);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error getting all items`, error: err });
    }
  }

  async updateItem(req: Request, res: Response) {
    const itemId = req.params.id;
    const newData = req.body;
    try {
      const itemUpdated = await this.itemsService.update(itemId, newData);
      return res.status(201).json(itemUpdated);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error updating item ${itemId}`, error: err });
    }
  }

  async deleteItem(req: Request, res: Response) {
    const itemId = req.params.id;
    try {
      await this.itemsService.delete(itemId);
      return res.status(201).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error deleting item ${itemId}`, error: err });
    }
  }

  async addActivityToItem(req: Request, res: Response) {
    const itemId = req.params.id;
    const activityId = req.body.activityId;
    try {
      await this.itemsService.addActivity(itemId, activityId);
      return res.status(201).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error adding activity to ${itemId}` });
    }
  }
}
