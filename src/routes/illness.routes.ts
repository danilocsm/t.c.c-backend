import { Router } from "express";
import { IllnessController } from "../controllers/illness.controller";
import { IllnessRepositoryImpl } from "../services//prisma/illness.service";

const illnessController = new IllnessController(new IllnessRepositoryImpl());

export const illnessRouter = Router();

illnessRouter.post("/create", async (req, res) => {
  const { name, description, symptoms, levelOfAttention } = req.body;
  try {
    const newIllness = await illnessController.createIllness({
      name,
      description,
      symptoms,
      levelOfAttention,
    });
    return res.status(201).json(newIllness);
  } catch (err) {
    return res.status(500).json({ errMsg: `Error creating new illness` });
  }
});

illnessRouter.get("/all", async (req, res) => {
  try {
    const allIllnesses = await illnessController.getAllIllnesses();
    return res.status(201).json(allIllnesses);
  } catch (err) {
    return res.status(500).json({ errMsg: `Error getting all illnesses` });
  }
});

illnessRouter.get("/:id", async (req, res) => {
  const illnessId = req.params.id;
  try {
    const retrievedIllness = await illnessController.getUniqueIllness(
      illnessId
    );
    return res.status(201).json(retrievedIllness);
  } catch (err) {
    return res
      .status(500)
      .json({ errMsg: `Error retrieving illness ${illnessId}` });
  }
});

illnessRouter.put("/:id/update", async (req, res) => {
  const illnessId = req.params.id;
  const newData = req.body;
  try {
    const updatedIllness = await illnessController.updateIllness(
      illnessId,
      newData
    );
    return res.status(201).json(updatedIllness);
  } catch (err) {
    return res
      .status(500)
      .json({ errMsg: `Error updating illness ${illnessId}` });
  }
});

illnessRouter.delete("/:id/delete", async (req, res) => {
  const illnessId = req.params.id;
  try {
    await illnessController.deleteIllness(illnessId);
    return res.status(201).json({});
  } catch (err) {
    return res
      .status(500)
      .json({ errMsg: `Error deleting illness ${illnessId}` });
  }
});

illnessRouter.patch("/:id/addActivity", async (req, res) => {
  const illnessId = req.params.id;
  const activityId = req.body.activityId;
  try {
    await illnessController.addActivityToIllness(illnessId, activityId);
    return res.status(201).json({});
  } catch (err) {
    return res
      .status(500)
      .json({ errMsg: `Error adding activity to illness ${illnessId}` });
  }
});
