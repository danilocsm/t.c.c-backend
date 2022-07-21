import express, { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dtos/user.dto";
import Controller from "../interfaces/controller.interface";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
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
    this.router.use(authMiddleware);

    // this.router.post(
    //   "/create",
    //   validationMiddleware(UserDTO, false),
    //   this.createUser
    // );

    this.router.get("/all", this.getAllUsers);

    this.router.get("/:id", this.getUniqueUser);

    this.router.patch(
      "/:id",
      validationMiddleware(UserDTO, true),
      this.updateUser
    );

    this.router.delete("/:id", this.deleteUser);
  }

  // private createUser = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   const user: UserDTO = req.body;
  //   try {
  //     const newUser = await this.userService.create({
  //       ...user,
  //     });
  //     return res.status(201).json(newUser);
  //   } catch (error) {
  //     return next(error);
  //   }
  // };

  private updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.id;
    const newData: UserDTO = req.body;
    try {
      const userUpdated = await this.userService.update(userId, { ...newData });
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
      retrievedUser.password = ""
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
