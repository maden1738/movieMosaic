import { GetLogsQuery, ILogs } from "../interface/logs";
import { LogsModel } from "../model/logs";
import * as LikedMoviesService from "./likedMovies";
import * as ReviewsService from "./reviews";
import * as watchlistService from "./watchList";
import * as FollowListService from "./followList";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("LogsService");

export async function createLog(userId: number, log: ILogs) {
     const { filmId, likeStatus, rating, content } = log;

     let reviewId: any = null;

     if (likeStatus) {
          LikedMoviesService.likeMovie(String(filmId), String(userId));
     } else {
          LikedMoviesService.deleteLikedMovies(String(filmId), String(userId));
     }

     if (rating || content) {
          reviewId = await ReviewsService.createReviews(filmId, userId, {
               content,
               rating,
          });
     }

     // adding movie to watched list
     await watchlistService.addWatchedMovies(String(filmId), String(userId));

     // removing movie from watchlist
     await watchlistService.deleteFromWatchList(String(filmId), String(userId));

     await LogsModel.create(filmId, userId, reviewId, likeStatus);
}

export async function getLogs(userId: number, query: GetLogsQuery) {
     logger.info("getLogs");

     const data = await LogsModel.getByUserId(userId, query);
     const count = await LogsModel.count(userId);

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

export async function getLogsOfFollowing(userId: number) {
     logger.info("getLogsOfFollowing");

     const data = await FollowListService.getFollowing(userId);
     const followersIdArr = data.map((follower) => follower.id);

     return await LogsModel.getByFollowingIds(followersIdArr);
}
