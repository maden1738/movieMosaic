import { NextFunction, query, Request, Response } from "express";
import { RequestWithUser } from "../interface/auth";
import * as UserService from "../service/user";
import { ForbiddenError } from ".././errors/ForbiddenError";
import HttpStatusCodes from "http-status-codes";
import { log } from "console";

export async function getUserById(
     req: Request,
     res: Response,
     next: NextFunction
) {
     const { id } = req.params;

     try {
          const data = await UserService.getUserById(+id);

          res.status(HttpStatusCodes.OK).json({ data });
     } catch (error) {
          next(error);
     }
}

export async function updateUser(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     const { id } = req.params;
     const { body } = req;

     // ensure that authenticated user matches the userId
     if (+id != req.user?.id!) {
          next(new ForbiddenError("unauthorized to modify this account"));
          return;
     }

     try {
          await UserService.updateProfile(+id, body);

          res.status(HttpStatusCodes.OK).json({
               message: `user with id ${id} updated`,
          });
     } catch (error) {
          next(error);
     }
}

export async function updateAvatar(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     const { id } = req.params;
     const { file } = req;

     // ensure that authenticated user matches the userId
     if (+id != req.user?.id!) {
          next(new ForbiddenError("unauthorized to modify this account"));
          return;
     }

     try {
          const imagePath = file?.path;

          await UserService.updateAvatar(+id, imagePath);

          res.status(HttpStatusCodes.OK).json({
               message: `user with id ${id} updated`,
          });
     } catch (error) {
          next(error);
     }
}

export async function updatePassword(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     const { id } = req.params;
     const { body } = req;

     // ensure that authenticated user matches the userId
     if (+id != req.user?.id!) {
          next(new ForbiddenError("unauthorized to modify this account"));
          return;
     }

     try {
          await UserService.updatePassword(+id, body);
          res.status(HttpStatusCodes.OK).json({
               message: `user with id ${id} updated`,
          });
     } catch (error) {
          next(error);
     }
}
export async function createLog(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     const { id } = req.params;
     const { body } = req;

     // ensure that authenticated user matches the userId
     if (+id != req.user?.id!) {
          next(new ForbiddenError("unauthorized to modify this account"));
          return;
     }

     try {
          await UserService.createLog(+id, body);

          res.status(HttpStatusCodes.OK).json({
               messagae: "Logged",
          });
     } catch (error) {
          next(error);
     }
}

export async function getLogs(req: Request, res: Response, next: NextFunction) {
     const { id } = req.params;
     const { query } = req;

     try {
          const data = await UserService.getLogs(+id, query);
          res.status(HttpStatusCodes.OK).json({
               data,
          });
     } catch (error) {
          next(error);
     }
}

export async function addToWatchList(
     req: RequestWithUser,
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
          await UserService.addToWatchList(movieId, userId, false);
          res.status(HttpStatusCodes.OK).json({
               message: "Movie added to watchlist",
          });
     } catch (error) {
          next(error);
     }
}
export async function addWatchedMovies(
     req: RequestWithUser,
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
          await UserService.addWatchedMovies(movieId, userId, true);
          res.status(HttpStatusCodes.OK).json({
               message: "Movie added to watched list",
          });
     } catch (error) {
          next(error);
     }
}

export async function getWatchList(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     try {
          const { id } = req.params;
          const { query } = req;

          const data = await UserService.getWatchList(id, query);

          res.status(HttpStatusCodes.OK).json(data);
     } catch (error) {
          next(error);
     }
}

export async function getWatchedMovies(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     try {
          const { id } = req.params;
          const { query } = req;

          const data = await UserService.getWatchedMovies(id, query);

          res.status(HttpStatusCodes.OK).json(data);
     } catch (error) {
          next(error);
     }
}

export async function deleteFromWatchList(
     req: RequestWithUser,
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
               message: `Movie with id: ${movieId} removed from watchlist`,
          });
     } catch (error) {
          next(error);
     }
}

export async function deleteFromWatchedList(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     const { id: userId, movieId } = req.params;

     // ensure that authenticated user matches the userId
     if (+userId != req.user?.id!) {
          next(new ForbiddenError("unauthorized to modify this watchedlist"));
          return;
     }

     try {
          await UserService.deleteFromWatchedList(movieId, userId);
          res.status(HttpStatusCodes.OK).json({
               message: `Movie with id: ${movieId} removed from watchedlist`,
          });
     } catch (error) {
          next(error);
     }
}

export async function likeMovie(
     req: RequestWithUser,
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
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     try {
          const { id } = req.params;
          const { query } = req;

          const data = await UserService.getLikedMovies(id, query);

          res.status(HttpStatusCodes.OK).json(data);
     } catch (error) {
          next(error);
     }
}

export async function deleteLikedMovies(
     req: RequestWithUser,
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
     req: RequestWithUser,
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
     req: RequestWithUser,
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

export async function getCurrentUserDetails(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     try {
          const data = await UserService.getUserById(req.user?.id!);
          res.status(HttpStatusCodes.OK).json({
               data,
          });
     } catch (error) {
          next(error);
     }
}

export async function getReviewByUserId(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     try {
          const { id } = req.params;

          const data = await UserService.getReviewByUserId(+id);
          res.status(HttpStatusCodes.OK).json({
               data,
          });
     } catch (error) {
          next(error);
     }
}

export async function getReviewOfFollowing(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     const { id, movieId } = req.params;
     const { query } = req;
     try {
          const data = await UserService.getReviewOfFollowing(
               movieId,
               id,
               query
          );

          res.status(HttpStatusCodes.OK).json({
               data,
          });
     } catch (error) {
          next(error);
     }
}

export async function getLogsOfFollowing(
     req: Request,
     res: Response,
     next: NextFunction
) {
     const { id } = req.params;
     console.log(id);
     try {
          const data = await UserService.getLogsOfFollowing(+id);

          res.status(HttpStatusCodes.OK).json({ data });
     } catch (error) {
          next(error);
     }
}
