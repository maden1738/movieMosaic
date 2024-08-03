import { NextFunction, Request, Response } from "express";
import * as MoviesService from ".././service/movies";
import { GetMoviesQuery, IFilmImage } from "../interface/movies";
import HttpStatusCode from "http-status-codes";
import { RequestWithUser } from "../interface/auth";
import { string } from "joi";
import { BadRequestError } from "../errors/BadRequestError";
import { MulterRequest } from "../interface/multer";
import multer from "multer";

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

export async function createMovie(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     const multerReq = req as MulterRequest;
     const { files } = multerReq;

     try {
          if (!files || Object.keys(files).length === 0) {
               next(new BadRequestError("no files uploaded"));
               return;
          }

          const imagesPath: IFilmImage = {
               poster: files.poster[0].path,
               backdrop: files.backdrop[0].path,
          };

          await MoviesService.createMovie(req.body, imagesPath, req.user?.id!);

          res.status(HttpStatusCode.OK).json({
               message: "New film added",
          });
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
          const { id } = req.params;
          const { query } = req;
          const data = await MoviesService.getReviews(+id, query);

          res.status(HttpStatusCode.OK).json(data);
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
