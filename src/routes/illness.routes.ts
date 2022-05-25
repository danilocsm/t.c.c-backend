import { Router } from "express";
import { IllnessController } from "../controllers/illness.controller";
import { IllnessRepositoryImpl } from "../services//prisma/illness.service";

const illnessController = new IllnessController(new IllnessRepositoryImpl());

export const illnessRouter = Router();

illnessRouter.post("/create", illnessController.createIllness);

illnessRouter.get("/all", illnessController.getAllIllnesses);

illnessRouter.get("/:id/get", illnessController.getUnique);

illnessRouter.put("/:id/update", illnessController.updateIllness);

illnessRouter.delete("/:id/delete", illnessController.deleteIllness);

illnessRouter.patch("/:id/addActivity", illnessController.addActivityToIllness);
