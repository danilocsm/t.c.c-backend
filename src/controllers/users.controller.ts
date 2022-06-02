import express, { NextFunction, Request, Response } from "express";
import Controller from "../interfaces/controller.interface";
import { UserRepositoryImpl } from "../services/prisma/user.service";

export class UserController implements Controller {
  public readonly path = "/users";
  public readonly router = express.Router();
  private readonly userService: UserRepositoryImpl;
  constructor() {
    this.userService = new UserRepositoryImpl();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/create", this.createUser);

    this.router.get("/all", this.getAllUsers);

    this.router.get("/:id/get", this.getUniqueUser);

    this.router.put("/:id/update", this.updateUser);

    this.router.delete("/:id/delete", this.deleteUser);
  }

  private createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username, email, password, picture } = req.body;
    try {
      const newUser = await this.userService.create({
        username,
        email,
        password,
        picture,
      });
      return res.status(201).json(newUser);
    } catch (error) {
      return next(error);
    }
  };

  private updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.id;
    const newData = req.body;
    try {
      const userUpdated = await this.userService.update(userId, newData);
      return res.status(200).json(userUpdated);
    } catch (error) {
      return next(error);
    }
  };

  private deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.id;
    try {
      await this.userService.delete(userId);
      return res.status(204).json({});
    } catch (error) {
      return next(error);
    }
  };

  private getUniqueUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.id;
    try {
      const retrievedUser = await this.userService.getById(userId);
      return res.status(200).json(retrievedUser);
    } catch (error) {
      return next(error);
    }
  };

  private getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const allUsers = await this.userService.getAll();
      return res.status(200).json(allUsers);
    } catch (error) {
      return next(error);
    }
  };
}
