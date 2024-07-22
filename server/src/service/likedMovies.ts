import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { LikedMoviesModel } from "../model/likedMovies";
import loggerWithNameSpace from "../utils/logger";
import { getMoviesById } from "./movies";

const logger = loggerWithNameSpace("likedMoviesService");

export async function likeMovie(movieId: string, userId: string) {
     const movieExists = await getMoviesById(movieId);

     if (!movieExists) {
          throw new NotFoundError(`Movie with id: ${movieId} not found`);
     }

     const data = await LikedMoviesModel.getMovie(movieId, userId);

     console.log(data);

     if (data.length > 0) {
          throw new BadRequestError("movie already exists on liked movies");
     }

     await LikedMoviesModel.likeMovie(movieId, userId);
}

export async function getLikedMovies(userId: string) {
     logger.info("getLikedMovies");
     return await LikedMoviesModel.getLikedMovies(userId);
}

export async function deleteLikedMovies(filmId: string, userId: string) {
     logger.info("deleteLikedMovies");
     const data = await LikedMoviesModel.getMovie(filmId, userId);

     if (data.length === 0) {
          throw new NotFoundError(
               `movie with id: ${filmId} doesnt exist on watchList`
          );
     }
     await LikedMoviesModel.deleteLikedMovies(filmId, userId);
}
