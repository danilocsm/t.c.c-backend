import express, { Request, Response } from "express";
import { ActivityRepositoryImpl } from "../services/prisma/activities.service";
import Controller from "../interfaces/controller.interface";

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

  readonly createActivity = async (req: Request, res: Response) => {
    const { description, difficulty, itemsId, illnessesId, images } = req.body;
    try {
      const activityCreated = await this.activityService.create({
        description,
        difficulty,
        itemsId,
        illnessesId,
        images,
      });
      return res.status(200).json(activityCreated);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error creating new activity`, error: err });
    }
  };

  readonly getUnique = async (req: Request, res: Response) => {
    const activityId = req.params.id;
    try {
      const retrievedActivity = await this.activityService.getById(activityId);
      return res.status(200).json(retrievedActivity);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error getting activity ${activityId}`, error: err });
    }
  };

  readonly getAllActivities = async (req: Request, res: Response) => {
    try {
      const allActivities = await this.activityService.getAll();
      return res.status(200).json(allActivities);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error getting all activities`, error: err });
    }
  };

  readonly updateActivity = async (req: Request, res: Response) => {
    const activityId = req.params.id;
    const newData = req.body;
    try {
      const updatedActivity = await this.activityService.update(
        activityId,
        newData
      );
      return res.status(200).json(updatedActivity);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error updating activity ${activityId}`, error: err });
    }
  };

  readonly deleteActivity = async (req: Request, res: Response) => {
    const activityId = req.params.id;
    try {
      await this.activityService.delete(activityId);
      return res.status(200).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error deleting activity ${activityId}`, error: err });
    }
  };

  readonly addImageToActivity = async (req: Request, res: Response) => {
    const activityId = req.params.id;
    const { newImage } = req.body;
    try {
      await this.activityService.addImage(activityId, newImage);
      return res.status(200).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error adding image ${newImage}`, error: err });
    }
  };

  readonly addItemToActivity = async (req: Request, res: Response) => {
    const activityId = req.params.id;
    const { itemId } = req.body;
    try {
      await this.activityService.addItem(activityId, itemId);
      return res.status(200).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error adding item ${itemId}`, error: err });
    }
  };

  readonly addIllnessToActivity = async (req: Request, res: Response) => {
    const activityId = req.params.id;
    const { illnessId } = req.body;
    try {
      await this.activityService.addIllness(activityId, illnessId);
      return res.status(200).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error adding illness ${activityId}`, error: err });
    }
  };
}
