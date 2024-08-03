import { BadRequestError } from "../errors/BadRequestError";
import { FollowListModel } from "../model/followList";
import loggerWithNameSpace from "../utils/logger";
import * as UserService from "../service/user";
import { NotFoundError } from "../errors/NotFoundError";

const logger = loggerWithNameSpace("followUserService");

export async function followUser(userId: number, followingId: number) {
     logger.info("followUser");

     if (userId === followingId) {
          throw new BadRequestError("user cant follow themself");
     }

     const data = await UserService.getUserById(followingId);

     if (!data) {
          throw new NotFoundError("user not found");
     }

     await FollowListModel.follow(userId, followingId);
}

export async function unfollowUser(userId: number, followingId: number) {
     logger.info("unfollowUser");

     if (userId === followingId) {
          throw new BadRequestError("Trying to unfollow themself");
     }

     await FollowListModel.unfollow(userId, followingId);
}

export async function getFollowers(userId: number) {
     logger.info("getFollowers");

     const data = await UserService.getUserById(userId);

     if (!data) {
          throw new NotFoundError("user not found");
     }

     return await FollowListModel.getFollowers(userId);
}

export async function getFollowing(userId: number) {
     logger.info("getFollowing");

     const data = await UserService.getUserById(userId);

     if (!data) {
          throw new NotFoundError("user not found");
     }

     return await FollowListModel.getFollowing(userId);
}
