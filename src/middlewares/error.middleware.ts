import { Request, Response, NextFunction } from "express";
import HttpException from "../errors/httpexcepction.error";

export default function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
    const status = 500 || error.status;
    const message = error.message || "Internal Server Error";
    return res.status(status).json({status, message});
}