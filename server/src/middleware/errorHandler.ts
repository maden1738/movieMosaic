import { Request, Response, NextFunction } from "express";
import loggerWithNameSpace from "../utils/logger";
import { UnauthenticatedError } from "../errors/UnauthenticatedError";
import { BadRequestError } from "../errors/BadRequestError";
import { ForbiddenError } from "../errors/ForbiddenError";
import HttpStatusCodes from "http-status-codes";
import { NotFoundError } from "../errors/NotFoundError";

const logger = loggerWithNameSpace("ErrorHandler");

export function notFoundError(req: Request, res: Response) {
     return res.status(HttpStatusCodes.NOT_FOUND).json({
          message: "Route not found",
     });
}

export function genericErrorHandler(
     error: Error,
     req: Request,
     res: Response,
     next: NextFunction
) {
     if (error.stack) {
          logger.error(error.stack);
     }

     if (error instanceof UnauthenticatedError) {
          return res.status(HttpStatusCodes.UNAUTHORIZED).json({
               message: error.message,
          });
     }
     if (error instanceof BadRequestError) {
          return res.status(HttpStatusCodes.BAD_REQUEST).json({
               message: error.message,
          });
     }
     if (error instanceof ForbiddenError) {
          return res.status(HttpStatusCodes.FORBIDDEN).json({
               message: error.message,
          });
     }

     if (error instanceof NotFoundError) {
          return res.status(HttpStatusCodes.NOT_FOUND).json({
               message: error.message,
          });
     }

     return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Internal server error",
     });
}
