import express, { Request, Response } from "express";
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
    this.router.post('/create', this.createUser);

    this.router.get('/all', this.getAllUsers);

    this.router.get('/:id/get', this.getUniqueUser);

    this.router.put('/:id/update', this.updateUser);

    this.router.delete('/:id/delete', this.deleteUser); 
  }

  readonly createUser = async (req: Request, res: Response) => {
    const { username, email, password, picture } = req.body;
    try {
      const newUser = await this.userService.create({
        username,
        email,
        password,
        picture,
      });
      return res.status(201).json(newUser);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error creating user`, error: err });
    }
  };

  readonly updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const newData = req.body;
    try {
      const userUpdated = await this.userService.update(userId, newData);
      return res.status(200).json(userUpdated);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error updating user ${userId}`, error: err });
    }
  };

  readonly deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      await this.userService.delete(userId);
      return res.status(200).json({});
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error deleting ${userId}`, error: err });
    }
  };

  readonly getUniqueUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const retrievedUser = await this.userService.getById(userId);
      return res.status(200).json(retrievedUser);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error retrieving user ${userId}`, error: err });
    }
  };

  readonly getAllUsers = async (req: Request, res: Response) => {
    try {
      const allUsers = await this.userService.getAll();
      return res.status(200).json(allUsers);
    } catch (err) {
      return res
        .status(500)
        .json({ errMsg: `Error getting users`, error: err });
    }
  };
}
