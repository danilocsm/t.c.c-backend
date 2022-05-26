import { Router } from "express";
import { ItemsController } from "../controllers/items.controller";
import { ItemsRepositoryImpl } from "../services/prisma/items.service";

const itemsController = new ItemsController(new ItemsRepositoryImpl());

export const itemsRouter = Router();

itemsRouter.post("/create", itemsController.createItem);

itemsRouter.get("/all", itemsController.getAllItems);

itemsRouter.get("/:id/get", itemsController.getUnique);

itemsRouter.put("/:id/update", itemsController.updateItem);

itemsRouter.delete("/:id/delete", itemsController.deleteItem);

itemsRouter.patch("/:id/addActivity", itemsController.addActivityToItem);
