import express, { NextFunction, Request, Response } from "express";
import { ItemDTO } from "../dtos/item.dto";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middlewares/validation.middleware";
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
    this.router.post(
      "/create",
      validationMiddleware(ItemDTO, false),
      this.createItem
    );

    this.router.get("/all", this.getAllItems);

    this.router.get("/:id", this.getUnique);

    this.router.patch(
      "/:id",
      validationMiddleware(ItemDTO, true),
      this.updateItem
    );

    this.router.patch("/:id/newActivity", this.addActivityToItem);

    this.router.delete("/:id", this.deleteItem);
  }

  private createItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, link, itemType } = req.body;
    try {
      const newItem = await this.itemsService.create({
        name,
        price,
        link,
        itemType,
      });
      return res.status(201).json(newItem);
    } catch (error) {
      return next(error);
    }
  };

  private getUnique = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const itemId = req.params.id;
    try {
      const itemRetrieved = await this.itemsService.getById(itemId);
      return res.status(200).json(itemRetrieved);
    } catch (error) {
      return next(error);
    }
  };

  private getAllItems = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allItems = await this.itemsService.getAll();
      return res.status(200).json(allItems);
    } catch (error) {
      return next(error);
    }
  };

  private updateItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const itemId = req.params.id;
    const newData = req.body;
    try {
      const itemUpdated = await this.itemsService.update(itemId, newData);
      return res.status(200).json(itemUpdated);
    } catch (error) {
      return next(error);
    }
  };

  private deleteItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const itemId = req.params.id;
    try {
      await this.itemsService.delete(itemId);
      return res.status(204).json({});
    } catch (error) {
      return next(error);
    }
  };

  private addActivityToItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const itemId = req.params.id;
    const { activityId } = req.body;
    try {
      await this.itemsService.addActivity(itemId, activityId);
      return res.status(204).json({});
    } catch (error) {
      return next(error);
    }
  };
}
