import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";

export default function validationMiddleware(
  validateSchema: any,
  skipMissingProperties: boolean
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const classCreated = plainToInstance(validateSchema, req.body);
    validate(classCreated, {skipMissingProperties}).then(errors => {
        if (errors.length > 0) {
            return next(errors);
        }else
            return next();
    }) 
 
  };
}
