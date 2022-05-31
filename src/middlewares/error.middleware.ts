import { Request, Response, NextFunction } from "express";
import GenericError from "../interfaces/error.interface";

export default function errorMiddleware(
  error: GenericError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = 500 || error.status;
  const message = error.message || "Internal Server Error";
  return res.status(status).json({ status, message });
}
