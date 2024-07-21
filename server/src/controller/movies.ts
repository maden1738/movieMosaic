import { NextFunction, Request, Response } from "express";
import * as MoviesService from ".././service/movies";
import { GetMoviesQuery } from "../interface/movies";
import HttpStatusCode from "http-status-codes";

export async function getMovies(
     req: Request<any, any, any, GetMoviesQuery>,
     res: Response
) {
     const { query } = req;

     const data = await MoviesService.getMovies(query);

     res.status(HttpStatusCode.OK).json(data);
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
