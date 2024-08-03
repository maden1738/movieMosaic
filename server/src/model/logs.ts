import { GetLogsQuery } from "../interface/logs";
import { BaseModel } from "./base";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("LogsModel");

export class LogsModel extends BaseModel {
     static async create(
          filmId: number,
          userId: number,
          reviewId: number,
          likeStatus: boolean
     ) {
          const dataToBeInserted = {
               filmId,
               userId,
               reviewId,
               likeStatus,
          };
          await this.queryBuilder().table("logs").insert(dataToBeInserted);
     }

     static async getByUserId(userId: number, query: GetLogsQuery) {
          const { size } = query;

          const data = this.queryBuilder()
               .table("logs")
               .select(
                    "user.name",
                    "user.avatarUrl",
                    "film.id as filmId",
                    "film.title",
                    "film.posterUrl",
                    "logs.likeStatus",
                    "logs.createdAt",
                    "review.content",
                    "review.rating",
                    "review.id as reviewId"
               )
               .join("film", "logs.filmId", "film.id")
               .join("user", "logs.userId", "user.id")
               .leftJoin("review", "logs.reviewId", "review.id")
               .where("logs.userId", userId)
               .limit(size!)
               .orderBy("logs.createdAt", "desc");

          return data;
     }

     static async getByFollowingIds(followingArr: Array<string>) {
          logger.info("getByFollowingIds");
          console.log(followingArr);

          const data = this.queryBuilder()
               .select(
                    "f.id as filmId",
                    "f.title",
                    "f.posterUrl",
                    "u.name",
                    "u.id as userId",
                    "r.id as reviewId",
                    "r.content",
                    "r.rating",
                    "l.likeStatus",
                    "u.avatarUrl",
                    "r.createdAt"
               )
               .table("logs as l")
               .leftJoin("review as r", "l.reviewId", "r.id")
               .join("film as f", "l.filmId", "f.id")
               .join("user as u", "l.userId", "u.id")
               .limit(6)
               .whereIn("l.userId", followingArr);

          return data;
     }
}
