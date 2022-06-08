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
  const cookies = req.cookies;
  if (cookies === undefined) return next(new AuthTokenMissingError());
  if (cookies === {}) return next(new AuthTokenMissingError());
  if (!cookies.Authorization) return next(new AuthTokenMissingError());

  const secret = process.env.TOKEN_SECRET as string;
  try {
    jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
    return next();
  } catch (error) {
    return next(new AuthWrongTokenError());
  }
}
