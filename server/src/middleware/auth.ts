import { NextFunction, Response } from "express";
import { RequestWithUser } from "../interface/auth";
import loggerWithNameSpace from "../utils/logger";
import { UnauthenticatedError } from "../errors/UnauthenticatedError";
import { verify } from "jsonwebtoken";
import config from "../config";
import { User } from "../interface/user";

const logger = loggerWithNameSpace("AuthMiddleware");

export function authenticate(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     logger.info("authenticate");

     const { authorization } = req.headers;

     if (!authorization) {
          next(new UnauthenticatedError("bearer token not found"));
          return;
     }

     const token = authorization.split(" ");

     if (token.length !== 2 || token[0] !== "Bearer") {
          next(new UnauthenticatedError("Bearer Token invalid format"));
          return;
     }

     try {
          const decoded = verify(token[1], config.jwt.secret!) as User;
          req.user = decoded;
     } catch (error) {
          next(new UnauthenticatedError("Unauthenticated"));
          return;
     }

     logger.info("user authenticated");
     next();
}
