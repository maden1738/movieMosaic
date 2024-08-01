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

     static async getLogs(userId: number) {
          const data = this.queryBuilder()
               .table("logs")
               .select(
                    "user.name",
                    "user.avatarUrl",
                    "film.id",
                    "film.title",
                    "film.posterUrl",
                    "logs.likeStatus",
                    "review.content",
                    "review.rating"
               )
               .join("film", "logs.filmId", "film.id")
               .join("user", "logs.userId", "user.id")
               .join("review", "logs.reviewId", "review.id")
               .where("logs.userId", userId);

          return data;
     }
}
