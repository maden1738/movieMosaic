import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { WatchedListModel } from "../model/watchedlist";
import loggerWithNameSpace from "../utils/logger";
import { getMoviesById } from "./movies";

const logger = loggerWithNameSpace("watchlistService");

export async function addToWatchedList(movieId: string, userId: string) {
     logger.info("addToWatchList");
     const movieExists = await getMoviesById(movieId);

     if (!movieExists) {
          throw new NotFoundError(`Movie with id: ${movieId} not found`);
     }

     const data = await WatchedListModel.getMovie(movieId, userId);

     if (data.length > 0) {
          throw new BadRequestError("Movie already exists on watchedlist");
     }

     await WatchedListModel.addToWatchedlist(movieId, userId);
}

export async function getWatchedList(userId: string) {
     return await WatchedListModel.getWatchedList(userId);
}

export async function deleteFromWatchedList(movieId: string, userId: string) {
     const data = await WatchedListModel.getMovie(movieId, userId);

     if (data.length === 0) {
          throw new NotFoundError(
               `movie with id: ${movieId} doesnt exist on watchList`
          );
     }

     await WatchedListModel.deleteFromWatchedList(movieId, userId);
}
