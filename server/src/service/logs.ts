import { ILogs } from "../interface/logs";
import { LogsModel } from "../model/logs";
import * as LikedMoviesService from "./likedMovies";
import * as ReviewsService from "./reviews";

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

     await LogsModel.create(filmId, userId, reviewId, likeStatus);
}

export async function getLogs(userId: number) {}
