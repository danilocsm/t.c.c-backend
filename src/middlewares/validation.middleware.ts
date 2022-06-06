import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ActivityDTO } from "../dtos/activity.dto";
import { ActivityFieldsInvalidError } from "../errors/activity.error";

export type ValidationErrorArgs = {
  values: any[];
  properties: string[];
  constraints: any[];
};

const buildArgs = (errors: ValidationError[]) => {
  const args: ValidationErrorArgs = {
    values: [],
    properties: [],
    constraints: [],
  };

  errors.forEach((err) => {
    args.values.push(err.value);
    args.properties.push(err.property);
    args.constraints.push(err.constraints);
  });

  return args;
};

export default function validationMiddleware(
  validateSchema: any,
  skipMissingProperties: boolean
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const classCreated = plainToInstance(validateSchema, req.body);
    validate(classCreated, {
      skipMissingProperties,
    }).then((errors) => {
      if (errors.length === 0) return next();

      if (classCreated instanceof ActivityDTO)
        return next(new ActivityFieldsInvalidError(buildArgs(errors)));
      else if (true) {
        return next();
      }
    });
  };
}
