import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../interface/user";
import { UserModel } from "../model/user";
import loggerWithNameSpace from "../utils/logger";
import bcrypt from "bcrypt";
import * as WatchListService from "./watchList";
import * as WatchedListService from "./watchedList";

const logger = loggerWithNameSpace("UserService");

export async function createUser(user: User) {
     logger.info("createUser");
     const data = await UserModel.getUserByEmail(user.email);

     if (data) {
          throw new BadRequestError("email already in use");
     }

     const password = await bcrypt.hash(user.password, 10);

     await UserModel.createUser({ ...user, password });
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
