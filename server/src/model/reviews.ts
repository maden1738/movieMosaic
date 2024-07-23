import { Review } from "../interface/reviews";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";

const logger = loggerWithNameSpace("reviewsModel");

export class ReviewsModel extends BaseModel {
     static async create(filmId: number, reviewedBy: number, body: Review) {
          logger.info("createReview");
          const dataToBeInserted = {
               filmId,
               reviewedBy,
               rating: body.rating,
               content: body.content || null,
          };

          await this.queryBuilder().insert(dataToBeInserted).table("review");
     }

     static async getByFilmId(filmId: number) {
          logger.info("getReviewByFilmId");
          const data = this.queryBuilder()
               .select(
                    "review.id as reviewId",
                    "user.id as userId",
                    "user.name",
                    "user.avatarUrl",
                    "review.content",
                    "review.rating"
               )
               .table("user")
               .join("review", "user.id", "review.reviewedBy")
               .where("review.filmId", filmId);
          return await data;
     }

     static async getById(reviewId: number) {
          logger.info("getReviewById");
          const data = this.queryBuilder()
               .select("id", "reviewedBy", "filmId")
               .table("review")
               .where("id", reviewId)
               .first();
          return await data;
     }

     static async update(reviewId: number, review: Review) {
          const reviewToUpdate = {
               updatedAt: new Date(),
               content: review.content,
               rating: review.rating,
          };

          await this.queryBuilder()
               .update(reviewToUpdate)
               .table("review")
               .where("id", reviewId);
     }
}
