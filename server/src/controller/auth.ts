import { NextFunction, Request, Response } from "express";
import * as AuthService from "../service/auth";
import HttpStatusCode from "http-status-codes";
import { UnauthenticatedError } from "../errors/UnauthenticatedError";

export async function signup(req: Request, res: Response, next: NextFunction) {
     try {
          const { body } = req;

          await AuthService.signup(body);

          res.status(HttpStatusCode.OK).json({
               message: "user signed up successfully",
          });
     } catch (error) {
          next(error);
     }
}

export async function login(req: Request, res: Response, next: NextFunction) {
     try {
          const { body } = req;

          const data = await AuthService.login(body);

          res.status(HttpStatusCode.OK).json({
               message: "user logged in successfully",
               data,
          });
     } catch (error) {
          next(error);
     }
}

export function refresh(req: Request, res: Response, next: NextFunction) {
     const { body } = req;

     const data = AuthService.refresh(body);

     if (!data) {
          next(new UnauthenticatedError("Unauthenticated"));
          return;
     }

     res.status(HttpStatusCode.OK).json(data);
}
