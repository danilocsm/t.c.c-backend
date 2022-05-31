import express, { NextFunction, Request, Response } from "express";
import { ActivityRepositoryImpl } from "../services/prisma/activities.service";
import Controller from "../interfaces/controller.interface";
import HttpException from "../errors/httpexception.error";
import { Activity } from "@prisma/client";

export class ActivityController implements Controller {
  public readonly path = "/activities";
  public readonly router = express.Router();
  private readonly activityService: ActivityRepositoryImpl;

  constructor() {
    this.activityService = new ActivityRepositoryImpl();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/create", this.createActivity);

    this.router.get("/all", this.getAllActivities);

    this.router.get("/:id/get", this.getUnique);

    this.router.put("/:id/update", this.updateActivity);

    this.router.patch("/:id/addItem", this.addItemToActivity);

    this.router.patch("/:id/addIllness", this.addIllnessToActivity);

    this.router.patch("/:id/addImage", this.addImageToActivity);

    this.router.delete("/:id/delete", this.deleteActivity);
  }

  private readonly createActivity = async (
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
      return res.status(200).json(activityCreated);
    } catch (error) {
      return next(error);
    }
  };

  private readonly getUnique = async (
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

  readonly getAllActivities = async (
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

  readonly updateActivity = async (
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

  readonly deleteActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const activityId = req.params.id;
    try {
      await this.activityService.delete(activityId);
      return res.status(200).json({});
    } catch (error) {
      return next(error);
    }
  };

  readonly addImageToActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const activityId = req.params.id;
    const { newImage } = req.body;
    try {
      await this.activityService.addImage(activityId, newImage);
      return res.status(200).json({});
    } catch (error) {
      return next(error);
    }
  };

  readonly addItemToActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const activityId = req.params.id;
    const { itemId } = req.body;
    try {
      await this.activityService.addItem(activityId, itemId);
      return res.status(200).json({});
    } catch (error) {
      return next(error);
    }
  };

  readonly addIllnessToActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const activityId = req.params.id;
    const { illnessId } = req.body;
    try {
      await this.activityService.addIllness(activityId, illnessId);
      return res.status(200).json({});
    } catch (error) {
      return next(error);
    }
  };
}
