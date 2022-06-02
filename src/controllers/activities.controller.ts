import express, { NextFunction, Request, Response } from "express";
import { ActivityRepositoryImpl } from "../services/prisma/activities.service";
import Controller from "../interfaces/controller.interface";
import { Activity } from "@prisma/client";
import { ActivityDTO } from "../dtos/activity.dto";
import validationMiddleware from "../middlewares/validation.middleware";

export class ActivityController implements Controller {
  public readonly path = "/activities";
  public readonly router = express.Router();
  private readonly activityService: ActivityRepositoryImpl;

  constructor() {
    this.activityService = new ActivityRepositoryImpl();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/create",  validationMiddleware(ActivityDTO, true), this.createActivity);

    this.router.get("/all", this.getAllActivities);

    this.router.get("/:id", this.getUnique);

    this.router.patch("/:id", validationMiddleware(ActivityDTO, true), this.updateActivity);

    this.router.patch("/:id/newItem", this.addItemToActivity);

    this.router.patch("/:id/newIllness", this.addIllnessToActivity);

    this.router.patch("/:id/newImage", this.addImageToActivity);

    this.router.delete("/:id", this.deleteActivity);
  }

  private createActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name, description, difficulty, itemsId, illnessesId, images } =
      req.body;
    try {
      const activityCreated = await this.activityService.create({
        name,
        description,
        difficulty,
        itemsId,
        illnessesId,
        images,
      });
      return res.status(201).json(activityCreated);
    } catch (error) {
      return next(error);
    }
  };

  private getUnique = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const activityId = req.params.id;
    let retrievedActivity = null;
    try {
      retrievedActivity = await this.activityService.getById(activityId);
      return res.status(200).json(retrievedActivity);
    } catch (error) {
      return next(error);
    }
  };

  private getAllActivities = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let allActivities: Activity[] = [];
    try {
      allActivities = await this.activityService.getAll();
      return res.status(200).json(allActivities);
    } catch (error) {
      return next(error);
    }
  };

  private updateActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const activityId = req.params.id;
    const newData = req.body;
    let updatedActivity;
    try {
      updatedActivity = await this.activityService.update(activityId, newData);
      return res.status(200).json(updatedActivity);
    } catch (error) {
      return next(error);
    }
  };

  private deleteActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const activityId = req.params.id;
    try {
      await this.activityService.delete(activityId);
      return res.status(204).json({});
    } catch (error) {
      return next(error);
    }
  };

  private addImageToActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const activityId = req.params.id;
    const { newImage } = req.body;
    try {
      await this.activityService.addImage(activityId, newImage);
      return res.status(204).json({});
    } catch (error) {
      return next(error);
    }
  };

  private addItemToActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const activityId = req.params.id;
    const { itemId } = req.body;
    try {
      await this.activityService.addItem(activityId, itemId);
      return res.status(204).json({});
    } catch (error) {
      return next(error);
    }
  };

  private addIllnessToActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const activityId = req.params.id;
    const { illnessId } = req.body;
    try {
      await this.activityService.addIllness(activityId, illnessId);
      return res.status(204).json({});
    } catch (error) {
      return next(error);
    }
  };
}
