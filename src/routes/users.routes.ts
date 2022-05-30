import { Router } from "express";
import { UserController } from "../controllers/users.controller";
import { UserRepositoryImpl } from "../services/prisma/user.service";

const userController = new UserController(new UserRepositoryImpl());

export const userRouter = Router();

userRouter.post('/create', userController.createUser);

userRouter.get('/all', userController.getAllUsers);

userRouter.get('/:id/get', userController.getUniqueUser);

userRouter.put('/:id/update', userController.updateUser);

userRouter.delete('/:id/delete', userController.deleteUser);
