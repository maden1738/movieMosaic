import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
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

     const data = await WatchListModel.getMovie(movieId, userId);

     if (data.length > 0) {
          throw new BadRequestError("movie already exists on watchlist");
     }

     await WatchListModel.addToWatchlist(movieId, userId);
}

export async function getWatchList(userId: string) {
     return await WatchListModel.getWatchlist(userId);
}

export async function deleteFromWatchList(movieId: string, userId: string) {
     const data = await WatchListModel.getMovie(movieId, userId);

     if (data.length === 0) {
          throw new NotFoundError(
               `movie with id: ${movieId} doesnt exist on watchList`
          );
     }

     await WatchListModel.deleteFromWatchList(movieId, userId);
}
