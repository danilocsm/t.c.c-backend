import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import {
  AuthTokenMissingError,
  AuthWrongTokenError,
} from "../errors/authentication.error";
import { DataStoredInToken } from "../interfaces/tokenData.interface";

dotenv.config();

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  if (!token) return next(new AuthTokenMissingError());

  const secret = process.env.TOKEN_SECRET as string;
  try {
    jwt.verify(token, secret) as DataStoredInToken;
    return next();
  } catch (error) {
    return next(new AuthWrongTokenError());
  }
}
