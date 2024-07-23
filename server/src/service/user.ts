import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../interface/user";
import { UserModel } from "../model/user";
import loggerWithNameSpace from "../utils/logger";
import bcrypt from "bcrypt";
import * as WatchListService from "./watchList";
import * as WatchedListService from "./watchedList";
import * as LikedMoviesService from "./likedMovies";
import * as FollowListService from "./followList";

const logger = loggerWithNameSpace("UserService");

export async function createUser(user: User) {
     logger.info("createUser");
     const data = await UserModel.getUserByEmail(user.email);

     if (data) {
          throw new BadRequestError("email already in use");
     }

     const password = await bcrypt.hash(user.password, 10);

     await UserModel.create({ ...user, password });
}

export async function getUserById(id: number) {
     return await UserModel.getById(id);
}

export async function getUserByEmail(email: string) {
     return await UserModel.getUserByEmail(email);
}

export async function addToWatchList(movieId: string, userId: string) {
     await WatchListService.addToWatchList(movieId, userId);
}

export async function addToWatchedList(movieId: string, userId: string) {
     await WatchedListService.addToWatchedList(movieId, userId);
}

export async function getWatchedList(userId: string) {
     return await WatchedListService.getWatchedList(userId);
}

export async function getWatchList(userId: string) {
     return await WatchListService.getWatchList(userId);
}

export async function deleteFromWatchList(movieId: string, userId: string) {
     await WatchListService.deleteFromWatchList(movieId, userId);
}

export async function deleteFromWatchedList(movieId: string, userId: string) {
     await WatchedListService.deleteFromWatchedList(movieId, userId);
}

export async function followUser(userId: number, followingId: number) {
     logger.info("followUser");
     await FollowListService.followUser(userId, followingId);
}
export async function unfollowUser(userId: number, followingId: number) {
     logger.info("followUser");
     await FollowListService.unfollowUser(userId, followingId);
}

export async function getFollowers(userId: number) {
     logger.info("getFollowers");
     return await FollowListService.getFollowers(userId);
}

export async function getFollowing(userId: number) {
     logger.info("getFollowing");
     return await FollowListService.getFollowing(userId);
}

export async function likeMovie(movieId: string, userId: string) {
     await LikedMoviesService.likeMovie(movieId, userId);
}

export async function getLikedMovies(userId: string) {
     logger.info("getLikeMovies");
     return await LikedMoviesService.getLikedMovies(userId);
}

export async function deleteLikedMovies(filmId: string, userId: string) {
     logger.info("deleteLikedMovies");
     await LikedMoviesService.deleteLikedMovies(filmId, userId);
}
