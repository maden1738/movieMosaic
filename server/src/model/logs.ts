import { GetLogsQuery } from "../interface/logs";
import { BaseModel } from "./base";

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

     static async getLogs(userId: number, query: GetLogsQuery) {
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
               .join("review", "logs.reviewId", "review.id")
               .where("logs.userId", userId)
               .limit(size!)
               .orderBy("logs.createdAt", "desc");

          return data;
     }

     static async getByFollowingIds(followingArr: Array<string>) {
          const data = this.queryBuilder()
               .table("logs l")
               .join("user u", "l.userId", "u.userId")
               .whereIn("u.id", followingArr);

          return data;
     }
}
