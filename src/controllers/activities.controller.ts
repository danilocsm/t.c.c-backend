import { Request, Response } from "express";
import { ActivityRepositoryImpl } from "../services/prisma/activities.service";

export class ActivityController {
  constructor(private readonly activityService: ActivityRepositoryImpl) {}

  async createActivity(req: Request, res: Response) {
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
        .json({ errMsg: "Error creating activity", error: err });
    }
  }

  async getUnique(req: Request, res: Response) {
    const activityId = req.params.id;
    try {
      const retrievedActivity = await this.activityService.getById(activityId);
      return res.status(200).json(retrievedActivity);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error getting activity ${activityId}`, error: err });
    }
  }

  async getAllActivities(req: Request, res: Response) {
    try {
      const allActivities = await this.activityService.getAll();
      return res.status(200).json(allActivities);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error getting all activities`, error: err });
    }
  }

  async updateActivity(req: Request, res: Response) {
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
  }

  async deleteActivity(req: Request, res: Response) {
    const activityId = req.params.id;
    try {
      await this.activityService.delete(activityId);
      return res.status(200).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error deleting activity ${activityId}`, error: err });
    }
  }

  async addImageToActivity(req: Request, res: Response) {
    const activityId = req.params.id;
    const newImage = req.body;
    try {
      await this.activityService.addImage(activityId, newImage);
      return res.status(200).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error adding image ${newImage}`, error: err });
    }
  }

  async addItemToActivity(req: Request, res: Response) {
    const activityId = req.params.id;
    const newItem = req.body;
    try {
      await this.activityService.addItem(activityId, newItem);
      return res.status(200).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error adding item ${newItem}`, error: err });
    }
  }

  async addIllnessToActivity(req: Request, res: Response) {
    const activityId = req.params.id;
    const newIllness = req.body;
    try {
        await this.activityService.addIllness(activityId, newIllness);
        return res.status(200).json({});
    } catch (err) {
        return res.status(500).json( { errMsg: `Error adding illness ${activityId}`, error: err});
    }
  }
}
