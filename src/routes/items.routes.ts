import { Router } from "express";
import { ItemsController } from "../controllers/items.controller";
import { ItemsRepositoryImpl } from "../services/items.service";

const itemsController = new ItemsController(new ItemsRepositoryImpl());

export const itemsRouter = Router();

itemsRouter.post("/create", async (req, res) => {
  const { name, price, link, itemType } = req.body;
  try {
    const newItem = await itemsController.createItem({
      name,
      price,
      link,
      itemType,
    });
    return res.status(201).json(newItem);
  } catch (err) {
    return res
      .status(500)
      .json({ errMsg: `Error creating new item`, error: err });
  }
});

itemsRouter.get("/all", async (req, res) => {
  try {
    const allItems = await itemsController.getAllItems();
    return res.status(201).json(allItems);
  } catch (err) {
    return res
      .status(500)
      .json({ errMsg: `Error getting all items`, error: err });
  }
});

itemsRouter.get("/:id", async (req, res) => {
  const itemId = req.params.id;
  try {
    const itemRetrieved = await itemsController.getUnique(itemId);
    return res.status(201).json(itemRetrieved);
  } catch (err) {
    return res
      .status(500)
      .json({ errMsg: `Error retrieving item ${itemId}`, error: err });
  }
});

itemsRouter.put("/:id/update", async (req, res) => {
  const itemId = req.params.id;
  const newData = req.body;
  try {
    const itemUpdated = await itemsController.updateItem(itemId, newData);
    return res.status(201).json(itemUpdated);
  } catch (err) {
    return res
      .status(500)
      .json({ errMsg: `Error updating item ${itemId}`, error: err });
  }
});

itemsRouter.delete("/:id/delete", async (req, res) => {
  const itemId = req.params.id;
  try {
    await itemsController.deleteItem(itemId);
    return res.status(201).json({});
  } catch (err) {
    return res
      .status(500)
      .json({ errMsg: `Error deleting item ${itemId}`, error: err });
  }
});

itemsRouter.patch("/:id/addActivity", async (req, res) => {
  const itemId = req.params.id;
  const activityId = req.body.activityId;
  try {
    await itemsController.addActivityToItem(itemId, activityId);
    return res.status(201).json({});
  } catch (err) {
    return res
      .status(500)
      .json({ errMsg: `Error adding activity to ${itemId}` });
  }
});
