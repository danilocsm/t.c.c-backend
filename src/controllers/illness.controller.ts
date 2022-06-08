import express, { NextFunction, Request, Response } from "express";
import { IllnessDTO } from "../dtos/illness.dto";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import { IllnessRepositoryImpl } from "../services/prisma/illness.service";

export class IllnessController implements Controller {
  public readonly path = "/illnesses";
  public readonly router = express.Router();
  private readonly illnessService: IllnessRepositoryImpl;
  constructor() {
    this.illnessService = new IllnessRepositoryImpl();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/all", this.getAllIllnesses);

    this.router.get("/:id", this.getUnique);

    this.router.use(authMiddleware);

    this.router.post(
      "/create",
      validationMiddleware(IllnessDTO, false),
      this.createIllness
    );

    this.router.patch(
      "/:id",
      validationMiddleware(IllnessDTO, false),
      this.updateIllness
    );

    this.router.patch("/:id/newActivity", this.addActivityToIllness);

    this.router.delete("/:id", this.deleteIllness);
  }

  private createIllness = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name, description, symptoms, levelOfAttention } = req.body;
    try {
      const newIllness = await this.illnessService.create({
        name,
        description,
        symptoms,
        levelOfAttention,
      });
      return res.status(201).json(newIllness);
    } catch (error) {
      return next(error);
    }
  };

  private getUnique = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const illnessId = req.params.id;
    try {
      const retrievedIllness = await this.illnessService.getById(illnessId);
      return res.status(200).json(retrievedIllness);
    } catch (error) {
      return next(error);
    }
  };

  private getAllIllnesses = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allIllnesses = await this.illnessService.getAll();
      return res.status(200).json(allIllnesses);
    } catch (error) {
      return next(error);
    }
  };

  private updateIllness = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const illnessId = req.params.id;
    const newData = req.body;
    try {
      const updatedIllness = await this.illnessService.update(
        illnessId,
        newData
      );
      return res.status(200).json(updatedIllness);
    } catch (error) {
      return next(error);
    }
  };

  private deleteIllness = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const illnessId = req.params.id;
    try {
      await this.illnessService.delete(illnessId);
      return res.status(204).json({});
    } catch (error) {
      return next(error);
    }
  };

  private addActivityToIllness = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const illnessId = req.params.id;
    const { activityId } = req.body;
    try {
      await this.illnessService.addActivity(illnessId, activityId);
      return res.status(204).json({});
    } catch (error) {
      return next(error);
    }
  };
}
