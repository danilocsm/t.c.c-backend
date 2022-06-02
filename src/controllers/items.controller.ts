import express, { Request, Response } from "express";
import Controller from "../interfaces/controller.interface";
import { ItemsRepositoryImpl } from "../services/prisma/items.service";

export class ItemsController implements Controller {
  public readonly path = "/items";
  public readonly router = express.Router();
  private readonly itemsService: ItemsRepositoryImpl;
  constructor() {
    this.itemsService = new ItemsRepositoryImpl();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/create", this.createItem);

    this.router.get("/all", this.getAllItems);

    this.router.get("/:id/get", this.getUnique);

    this.router.put("/:id/update", this.updateItem);

    this.router.delete("/:id/delete", this.deleteItem);

    this.router.patch("/:id/addActivity", this.addActivityToItem);
  }

  readonly createItem = async (req: Request, res: Response) => {
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
  };

  readonly getUnique = async (req: Request, res: Response) => {
    const itemId = req.params.id;
    try {
      const itemRetrieved = await this.itemsService.getById(itemId);
      return res.status(200).json(itemRetrieved);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error retrieving item ${itemId}`, error: err });
    }
  };

  readonly getAllItems = async (req: Request, res: Response) => {
    try {
      const allItems = await this.itemsService.getAll();
      return res.status(200).json(allItems);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error getting all items`, error: err });
    }
  };

  readonly updateItem = async (req: Request, res: Response) => {
    const itemId = req.params.id;
    const newData = req.body;
    try {
      const itemUpdated = await this.itemsService.update(itemId, newData);
      return res.status(200).json(itemUpdated);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error updating item ${itemId}`, error: err });
    }
  };

  readonly deleteItem = async (req: Request, res: Response) => {
    const itemId = req.params.id;
    try {
      await this.itemsService.delete(itemId);
      return res.status(204).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error deleting item ${itemId}`, error: err });
    }
  };

  readonly addActivityToItem = async (req: Request, res: Response) => {
    const itemId = req.params.id;
    const { activityId } = req.body.activityId;
    try {
      await this.itemsService.addActivity(itemId, activityId);
      return res.status(204).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error adding activity to ${itemId}` });
    }
  };
}
