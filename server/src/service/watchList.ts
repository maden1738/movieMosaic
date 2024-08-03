import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { GetMoviesQuery } from "../interface/movies";
import { WatchListModel } from "../model/watchList";
import loggerWithNameSpace from "../utils/logger";
import { getMoviesById } from "./movies";

const logger = loggerWithNameSpace("watchlistService");

export async function addToWatchList(movieId: string, userId: string) {
     logger.info("addToWatchList");
     const movieExists = await getMoviesById(movieId);

     if (!movieExists) {
          throw new NotFoundError(`Movie with id: ${movieId} not found`);
     }

     const data = await WatchListModel.getMovie(movieId, userId, false);

     if (data.length > 0) {
          throw new BadRequestError("movie already exists on watchlist");
     }

     await WatchListModel.create(movieId, userId, false);
}

export async function addWatchedMovies(movieId: string, userId: string) {
     logger.info("addWatched");
     const movieExists = await getMoviesById(movieId);

     if (!movieExists) {
          throw new NotFoundError(`Movie with id: ${movieId} not found`);
     }

     const data = await WatchListModel.getMovie(movieId, userId, true);

     // already watched movie
     if (data.length > 0) {
          return;
     }

     await WatchListModel.create(movieId, userId, true);
}

export async function getWatchList(userId: string, query: GetMoviesQuery) {
     const data = await WatchListModel.getWatchlist(userId, query);

     const count = await WatchListModel.count(userId, query);

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

export async function getWatchedMovies(userId: string, query: GetMoviesQuery) {
     const data = await WatchListModel.getWatchedMovies(userId, query);

     const count = await WatchListModel.countWatchedMovies(userId, query);

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

export async function deleteFromWatchList(movieId: string, userId: string) {
     const data = await WatchListModel.getMovie(movieId, userId, false);

     // movie isnt in watchlist
     if (data.length === 0) {
          return;
     }

     await WatchListModel.deleteFromWatchList(movieId, userId);
}

export async function deleteFromWatchedList(movieId: string, userId: string) {
     const data = await WatchListModel.getMovie(movieId, userId, true);

     if (data.length === 0) {
          throw new NotFoundError(
               `movie with id: ${movieId} doesnt exist on watchedList`
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
