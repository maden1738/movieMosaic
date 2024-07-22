import { NextFunction, Request, Response } from "express";
import { IRequest } from "../interface/auth";
import * as UserService from "../service/user";
import { ForbiddenError } from ".././errors/ForbiddenError";
import HttpStatusCodes from "http-status-codes";

export async function addToWatchList(
     req: IRequest,
     res: Response,
     next: NextFunction
) {
     const { id: userId } = req.params;
     const { movieId } = req.body;

     // ensure that authenticated user matches the userId
     if (+userId != req.user?.id!) {
          next(new ForbiddenError("unauthorized to modify this watchlist"));
          return;
     }

     try {
          await UserService.addToWatchList(movieId, userId);
          res.status(HttpStatusCodes.OK).json({
               message: "Movie added to watchlist",
          });
     } catch (error) {
          next(error);
     }
}

export async function addToWatchedList(
     req: IRequest,
     res: Response,
     next: NextFunction
) {
     const { id: userId } = req.params;
     const { movieId } = req.body;

     // ensure that authenticated user matches the userId
     if (+userId != req.user?.id!) {
          next(new ForbiddenError("unauthorized to modify this watchlist"));
          return;
     }

     try {
          await UserService.addToWatchedList(movieId, userId);
          res.status(HttpStatusCodes.OK).json({
               message: "Movie added to watchedlist",
          });
     } catch (error) {
          next(error);
     }
}

export async function getWatchedList(
     req: IRequest,
     res: Response,
     next: NextFunction
) {
     try {
          const { id: userId } = req.params;

          const data = await UserService.getWatchedList(userId);

          res.status(HttpStatusCodes.OK).json({
               data,
          });
     } catch (error) {
          next(error);
     }
}

export async function getWatchList(
     req: IRequest,
     res: Response,
     next: NextFunction
) {
     try {
          const { id: userId } = req.params;

          const data = await UserService.getWatchList(userId);

          res.status(HttpStatusCodes.OK).json({
               data,
          });
     } catch (error) {
          next(error);
     }
}

export async function deleteFromWatchList(
     req: IRequest,
     res: Response,
     next: NextFunction
) {
     const { id: userId, movieId } = req.params;

     // ensure that authenticated user matches the userId
     if (+userId != req.user?.id!) {
          next(new ForbiddenError("unauthorized to modify this watchlist"));
          return;
     }

     try {
          await UserService.deleteFromWatchList(movieId, userId);
          res.status(HttpStatusCodes.OK).json({
               message: `Movie with id: ${movieId} removed from watchedlist`,
          });
     } catch (error) {
          next(error);
     }
}

export async function deleteFromWatchedList(
     req: IRequest,
     res: Response,
     next: NextFunction
) {
     const { id: userId, movieId } = req.params;

     // ensure that authenticated user matches the userId
     if (+userId != req.user?.id!) {
          next(new ForbiddenError("unauthorized to modify this watchlist"));
          return;
     }

     try {
          await UserService.deleteFromWatchedList(movieId, userId);
          res.status(HttpStatusCodes.OK).json({
               message: `Movie with id: ${movieId} removed from watchlist`,
          });
     } catch (error) {
          next(error);
     }
}
