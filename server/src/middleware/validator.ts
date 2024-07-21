import { Schema } from "joi";
import loggerWithNameSpace from "../utils/logger";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/BadRequestError";

const logger = loggerWithNameSpace("validatorLogger");

export function validateReqQuery(schema: Schema) {
     return (req: Request, res: Response, next: NextFunction) => {
          logger.info("validateReqQuery");

          const { error, value } = schema.validate(req.query);

          if (error) {
               next(new BadRequestError(error.message));
          }

          req.query = value;
          next();
     };
}

export function validateReqBody(schema: Schema) {
     return (req: Request, res: Response, next: NextFunction) => {
          logger.info("validateReqQuery");

          const { error, value } = schema.validate(req.body);

          if (error) {
               next(new BadRequestError(error.message));
          }

          req.body = value;
          next();
     };
}
