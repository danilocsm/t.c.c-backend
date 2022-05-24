import { Router } from "express";
import { ItemsController } from "../controllers/items.controller";
import { ItemsRepositoryImpl } from "../services/items.service";

const itemsController = new ItemsController(new ItemsRepositoryImpl());

export const itemsRouter = Router();

itemsRouter.post("/create", async (req, res) => {
  const { name, price, link, itemType } = req.body;
  const newItem = await itemsController.createItem({
    name,
    price,
    link,
    itemType,
  });
  return res.status(201).json(newItem);
});

itemsRouter.get("/all", async (req, res) => {
  const allItems = await itemsController.getAllItems();
  return res.status(201).json(allItems);
});

itemsRouter.get("/:id", async (req, res) => {
  const itemId = req.params.id;
  const itemRetrieved = await itemsController.getUnique(itemId);
  return res.status(201).json(itemRetrieved);
});

itemsRouter.patch("/:id/update", async (req, res) => {
  const itemId = req.params.id;
  const newData = req.body;
  const itemUpdated = await itemsController.updateItem(itemId, newData);
  return res.status(201).json(itemUpdated);    
});

itemsRouter.delete("/:id/delete", async (req, res) => {
    const itemId = req.params.id;
    await itemsController.deleteItem(itemId);
    return res.status(201).json({});
});

itemsRouter.patch("/:id/addActivity", async (req, res) => {
    const itemId = req.params.id;
    const activityId = req.body.activityId;
    await itemsController.addActivityToItem(itemId, activityId);
    return res.status(201).json({});
});
