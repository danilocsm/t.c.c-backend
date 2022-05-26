import { Request, Response } from "express";
import { IllnessRepositoryImpl } from "../services/prisma/illness.service";

export class IllnessController {
  constructor(private readonly illnessService: IllnessRepositoryImpl) {}

  readonly createIllness = async (req: Request, res: Response) => {
    const { name, description, symptoms, levelOfAttention } = req.body;
    try {
      const newIllness = await this.illnessService.create({
        name,
        description,
        symptoms,
        levelOfAttention,
      });
      return res.status(201).json(newIllness);
    } catch (err) {
      return res.status(500).json({ errMsg: `Error creating new illness` });
    }
  };

  readonly getUnique = async (req: Request, res: Response) => {
    const illnessId = req.params.id;
    try {
      const retrievedIllness = await this.illnessService.getById(illnessId);
      return res.status(201).json(retrievedIllness);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error retrieving illness ${illnessId}` });
    }
  };

  readonly getAllIllnesses = async (req: Request, res: Response) => {
    try {
      const allIllnesses = await this.illnessService.getAll();
      return res.status(201).json(allIllnesses);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error getting all illnesses`, error: err });
    }
  };

  readonly updateIllness = async (req: Request, res: Response) => {
    const illnessId = req.params.id;
    const newData = req.body;
    try {
      const updatedIllness = await this.illnessService.update(
        illnessId,
        newData
      );
      return res.status(201).json(updatedIllness);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error updating illness ${illnessId}` });
    }
  };

  readonly deleteIllness = async (req: Request, res: Response) => {
    const illnessId = req.params.id;
    try {
      await this.illnessService.delete(illnessId);
      return res.status(201).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error deleting illness ${illnessId}` });
    }
  };

  readonly addActivityToIllness = async (req: Request, res: Response) => {
    const illnessId = req.params.id;
    const { activityId } = req.body.activityId;
    try {
      await this.illnessService.addActivity(illnessId, activityId);
      return res.status(201).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error adding activity to illness ${illnessId}` });
    }
  };
}
