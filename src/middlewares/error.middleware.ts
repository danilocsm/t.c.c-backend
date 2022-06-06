import { Request, Response, NextFunction } from "express";
import GenericError from "../interfaces/error.interface";

export default function errorMiddleware(
  error: GenericError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  const args = error.args;
  return res
    .status(status)
    .send({status, message, args});
}
