import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";

const logger = loggerWithNameSpace("FollowListModel");

export class FollowListModel extends BaseModel {
     static async follow(userId: number, followingId: number) {
          logger.info("follow");
          await this.queryBuilder()
               .insert({ userId, followingId })
               .table("follow_list");
     }

     static async unfollow(userId: number, followingId: number) {
          logger.info("unfollow");
          await this.queryBuilder()
               .delete()
               .table("follow_list")
               .where({ userId, followingId });
     }

     static async getFollowers(userId: number) {
          logger.info("getFollowers");
          const data = await this.queryBuilder()
               .select("user.id", "user.name", "user.avatarUrl ")
               .table("user")
               .join("followList", "user.id", "followList.userId")
               .where("followList.followingId", userId);

          return data;
     }

     static getFollowing(userId: number) {
          logger.info("getFollowing");
          const data = this.queryBuilder()
               .select("user.id", "user.name", "user.avatarUrl ")
               .table("user")
               .join("followList", "user.id", "followList.followingId")
               .where("followList.userId", userId);
          return data;
     }
}
