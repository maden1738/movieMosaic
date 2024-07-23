import { NextFunction, Request, Response } from "express";
import { RequesWithUser } from "../interface/auth";
import * as UserService from "../service/user";
import { ForbiddenError } from ".././errors/ForbiddenError";
import HttpStatusCodes from "http-status-codes";
import { nextTick } from "process";
import { http } from "winston";

export async function addToWatchList(
     req: RequesWithUser,
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
     req: RequesWithUser,
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
     req: RequesWithUser,
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
     req: RequesWithUser,
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
     req: RequesWithUser,
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
     req: RequesWithUser,
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

export async function likeMovie(
     req: RequesWithUser,
     res: Response,
     next: NextFunction
) {
     const { id: userId } = req.params;
     const { movieId } = req.body;

     // ensure that authenticated user matches the userId
     if (+userId != req.user?.id!) {
          next(new ForbiddenError("unauthorized to modify this list"));
          return;
     }

     try {
          await UserService.likeMovie(movieId, userId);
          res.status(HttpStatusCodes.CREATED).json({
               message: `Movie with id: ${movieId} added to likedmovies`,
          });
     } catch (error) {
          next(error);
     }
}

export async function getLikedMovies(
     req: RequesWithUser,
     res: Response,
     next: NextFunction
) {
     try {
          const { id } = req.params;

          const data = await UserService.getLikedMovies(id);

          res.status(HttpStatusCodes.OK).json({
               data,
          });
     } catch (error) {
          next(error);
     }
}

export async function deleteLikedMovies(
     req: RequesWithUser,
     res: Response,
     next: NextFunction
) {
     const { id: userId, filmId } = req.params;

     // ensure that authenticated user matches the userId
     if (+userId != req.user?.id!) {
          next(new ForbiddenError("unauthorized to modify this watchlist"));
          return;
     }
     try {
          await UserService.deleteLikedMovies(filmId, userId);
          res.status(HttpStatusCodes.OK).json({
               message: `Movie with id: ${filmId} removed from liked movies`,
          });
     } catch (error) {
          next(error);
     }
}

export async function followUser(
     req: RequesWithUser,
     res: Response,
     next: NextFunction
) {
     const userId = req.user?.id!;
     const { id } = req.params;

     try {
          await UserService.followUser(+userId, +id);

          res.status(HttpStatusCodes.CREATED).json({
               message: `User with id: ${userId} has followed user ${id}`,
          });
     } catch (error) {
          next(error);
     }
}

export async function unfollowUser(
     req: RequesWithUser,
     res: Response,
     next: NextFunction
) {
     const userId = req.user?.id!;
     const { id } = req.params;

     try {
          await UserService.unfollowUser(+userId, +id);
          res.status(HttpStatusCodes.CREATED).json({
               message: `User with id: ${userId} has unfollowed user ${id}`,
          });
     } catch (error) {
          next(error);
     }
}

export async function getFollowers(
     req: Request,
     res: Response,
     next: NextFunction
) {
     const { id } = req.params;

     try {
          const data = await UserService.getFollowers(+id);
          res.status(HttpStatusCodes.OK).json({
               data,
          });
     } catch (error) {
          next(error);
     }
}

export async function getFollowing(
     req: Request,
     res: Response,
     next: NextFunction
) {
     const { id } = req.params;

     try {
          const data = await UserService.getFollowing(+id);
          res.status(HttpStatusCodes.OK).json({
               data,
          });
     } catch (error) {
          next(error);
     }
}
