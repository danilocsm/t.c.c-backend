import { ItemType } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { ItemDTO } from "../dtos/item.dto";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middlewares/auth.middleware";
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
    this.router.get("/all", this.getAllItems);

    this.router.get("/:id", this.getUnique);

    this.router.get("/all/:filter", this.getFilteredItems);

    this.router.use(authMiddleware);

    this.router.post(
      "/create",
      validationMiddleware(ItemDTO, false),
      this.createItem
    );

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
    const item: ItemDTO = req.body;
    try {
      const newItem = await this.itemsService.create({
        ...item,
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

  private getFilteredItems = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filter = req.params.filter;
      const filteredItems = await this.itemsService.getWithFilter(
        req.params.filter as ItemType
      );
      return res.status(200).json(filteredItems);
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
    const newData: ItemDTO = req.body;
    try {
      const itemUpdated = await this.itemsService.update(itemId, {
        ...newData,
      });
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
