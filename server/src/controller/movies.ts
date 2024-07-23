import { NextFunction, Request, Response } from "express";
import * as MoviesService from ".././service/movies";
import { GetMoviesQuery } from "../interface/movies";
import HttpStatusCode from "http-status-codes";
import { RequestWithUser } from "../interface/auth";

export async function getMovies(
     req: Request<any, any, any, GetMoviesQuery>,
     res: Response,
     next: NextFunction
) {
     try {
          const { query } = req;

          const data = await MoviesService.getMovies(query);

          res.status(HttpStatusCode.OK).json(data);
     } catch (error) {
          next(error);
     }
}

export async function getMoviesById(
     req: Request,
     res: Response,
     next: NextFunction
) {
     try {
          const { id } = req.params;

          const data = await MoviesService.getMoviesById(id);

          res.status(HttpStatusCode.OK).json({ data });
     } catch (error) {
          next(error);
     }
}

export async function createReviews(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     try {
          const { id: filmId } = req.params;
          const { body } = req;

          await MoviesService.createReviews(+filmId, req.user?.id!, body);

          res.status(HttpStatusCode.CREATED).json({
               message: "review created",
          });
     } catch (error) {
          next(error);
     }
}

export async function getReviews(
     req: Request,
     res: Response,
     next: NextFunction
) {
     try {
          const { id: filmId } = req.params;
          const data = await MoviesService.getReviews(+filmId);

          res.status(HttpStatusCode.OK).json({ data });
     } catch (error) {
          next(error);
     }
}

export async function updateReview(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     try {
          const { reviewId } = req.params;
          const { body } = req;

          await MoviesService.updateReview(+reviewId, req.user?.id!, body);

          res.status(HttpStatusCode.OK).json({
               message: `review with id: ${reviewId} updated`,
          });
     } catch (error) {
          next(error);
     }
}
