import { Router } from "express";
import { ActivityController } from "../controllers/activities.controller";
import { ActivityRepositoryImpl } from "../services/prisma/activities.service";

const activitiesController = new ActivityController(new ActivityRepositoryImpl);

export const activitiesRouter = Router();

activitiesRouter.post('/create', activitiesController.createActivity);

activitiesRouter.get('/all', activitiesController.getAllActivities);

activitiesRouter.get('/:id', activitiesController.getUnique);

activitiesRouter.put('/:id/update', activitiesController.updateActivity);

activitiesRouter.patch('/:id/addItem', activitiesController.addItemToActivity);

activitiesRouter.patch('/:id/addIllness', activitiesController.addIllnessToActivity);

activitiesRouter.patch('/:id/addImage', activitiesController.addImageToActivity);

activitiesRouter.delete('/:id/delete', activitiesController.deleteActivity);
