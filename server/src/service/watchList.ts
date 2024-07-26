import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { WatchListModel } from "../model/watchList";
import loggerWithNameSpace from "../utils/logger";
import { getMoviesById } from "./movies";

const logger = loggerWithNameSpace("watchlistService");

export async function addToWatchList(
     movieId: string,
     userId: string,
     watched: boolean
) {
     logger.info("addToWatchList");
     const movieExists = await getMoviesById(movieId);

     if (!movieExists) {
          throw new NotFoundError(`Movie with id: ${movieId} not found`);
     }

     const data = await WatchListModel.getMovie(movieId, userId, false);

     if (data.length > 0) {
          throw new BadRequestError("movie already exists on watchlist");
     }

     await WatchListModel.create(movieId, userId, watched);
}

export async function addWatchedMovies(
     movieId: string,
     userId: string,
     watched: boolean
) {
     logger.info("addWatched");
     const movieExists = await getMoviesById(movieId);

     if (!movieExists) {
          throw new NotFoundError(`Movie with id: ${movieId} not found`);
     }

     const data = await WatchListModel.getMovie(movieId, userId, true);

     if (data.length > 0) {
          throw new BadRequestError(
               "movie already exists on watched movies list"
          );
     }

     await WatchListModel.create(movieId, userId, watched);
}

export async function getWatchList(userId: string) {
     return await WatchListModel.getWatchlist(userId);
}
export async function getWatchedMovies(userId: string) {
     return await WatchListModel.getWatchedMovies(userId);
}

export async function deleteFromWatchList(movieId: string, userId: string) {
     const data = await WatchListModel.getMovie(movieId, userId, false);

     if (data.length === 0) {
          throw new NotFoundError(
               `movie with id: ${movieId} doesnt exist on watchList`
          );
     }

     await WatchListModel.deleteFromWatchList(movieId, userId);
}

export async function deleteFromWatchedList(movieId: string, userId: string) {
     const data = await WatchListModel.getMovie(movieId, userId, true);

     if (data.length === 0) {
          throw new NotFoundError(
               `movie with id: ${movieId} doesnt exist on watchList`
          );
     }

     await WatchListModel.deleteWatchedMovies(movieId, userId);
}

export async function getStatus(
     filmId: string,
     userId: string,
     watched: boolean
) {
     return await WatchListModel.getStatus(filmId, userId, watched);
}
