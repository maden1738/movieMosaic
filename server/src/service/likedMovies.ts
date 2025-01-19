import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { GetMoviesQuery } from "../interface/movies";
import { LikedMoviesModel } from "../model/likedMovies";
import loggerWithNameSpace from "../utils/logger";
import { getMoviesById } from "./movies";

const logger = loggerWithNameSpace("likedMoviesService");

export async function likeMovie(movieId: string, userId: string) {
     logger.info("likeMovie");

     const data = await LikedMoviesModel.getMovie(movieId, userId);

     // movie is already liked
     if (data.length > 0) {
          return;
     }
     await LikedMoviesModel.likeMovie(movieId, userId);
}

export async function getLikedMovies(userId: string, query: GetMoviesQuery) {
     logger.info("getLikedMovies");
     const data = await LikedMoviesModel.get(userId, query);

     const count = await LikedMoviesModel.count(userId);

     const { size } = query;
     const total = +count.count;

     const meta = {
          page: query.page,
          size: data.length,
          total,
          totalPages: Math.ceil(total / size!),
     };

     return { meta, data };
}

export async function deleteLikedMovies(filmId: string, userId: string) {
     logger.info("deleteLikedMovies");
     const data = await LikedMoviesModel.getMovie(filmId, userId);

     if (data.length === 0) {
          // throw new NotFoundError(
          //      `movie with id: ${filmId} doesnt exist on liked movies`
          // );
          return;
     }
     await LikedMoviesModel.deleteLikedMovies(filmId, userId);
}

export async function getStatus(filmId: string, userId: string) {
     return await LikedMoviesModel.getStatus(filmId, userId);
}
