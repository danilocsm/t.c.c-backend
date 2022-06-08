import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import { Request, Response, NextFunction, Router } from "express";
import { LoginDTO } from "../dtos/login.dto";
import { UserDTO } from "../dtos/user.dto";
import { AuthWrongCredentialsError } from "../errors/authentication.error";
import Controller from "../interfaces/controller.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import { UserRepositoryImpl } from "../services/prisma/user.service";
import { User } from ".prisma/client";
import { DataStoredInToken } from "../interfaces/tokenData.interface";

dotenv.config();

interface TokenData {
  token: string;
  expiresIn: number;
}

export class AuthenticationController implements Controller {
  public readonly path: string;
  public readonly router: Router;
  private readonly userService: UserRepositoryImpl;
  constructor() {
    this.path = "/auth";
    this.router = Router();
    this.userService = new UserRepositoryImpl();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post(
      "/register",
      validationMiddleware(UserDTO, false),
      this.register
    );

    this.router.post(
      "/login",
      validationMiddleware(LoginDTO, false),
      this.login
    );

    this.router.post("/logout", this.logout);
  }

  private createToken = (user: User): TokenData => {
    const expiresIn = 60 * 60; // one hour
    const dataStored: DataStoredInToken = {
      id: user.email,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStored, process.env.TOKEN_SECRET as string, {
        expiresIn,
      }),
    };
  };

  private createCookie = (tokenData: TokenData) => {
    return `Authorization-${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  };

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user: UserDTO = req.body;
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await this.userService.create({
        ...user,
        password: hashedPassword,
      });
      newUser.password = "";
      const tokenData = this.createToken(newUser);
      res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
      return res.status(201).json(newUser);
    } catch (error) {
      return next(error);
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const user = await this.userService.getByEmail(email);
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) return next(new AuthWrongCredentialsError());
      user.password = "";
      const tokenData = this.createToken(user);
      res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
      return res.status(200).json(user);
    } catch (error) {
      return next(new AuthWrongCredentialsError());
    }
  };

  private logout = (req: Request, res: Response) => {
    res.setHeader("Set-Cookie", ["Authorization=;Max-Age=0"]);
    res.send(200);
  };
}
