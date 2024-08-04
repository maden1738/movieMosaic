import { log } from "console";
import { GetReviewsQuery, Review } from "../interface/reviews";
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

          const result = await this.queryBuilder()
               .insert(dataToBeInserted)
               .table("review")
               .returning("id");

          return result[0].id;
     }

     static async getByFilmId(filmId: number, query: GetReviewsQuery) {
          logger.info("getReviewByFilmId");

          const { size, page, sortBy } = query;

          const data = this.queryBuilder()
               .select(
                    "review.id as reviewId",
                    "user.id as userId",
                    "user.name",
                    "user.avatarUrl",
                    "review.content",
                    "review.rating",
                    "review.createdAt"
               )
               .table("user")
               .join("review", "user.id", "review.reviewedBy")
               .where("review.filmId", filmId)
               .limit(size!)
               .offset((page! - 1) * size!);

          if (sortBy === "recent") {
               data.orderBy("review.createdAt");
          }

          return data;
     }

     static async getByFollowingIds(
          filmId: string,
          followingArr: Array<string>,
          query: GetReviewsQuery
     ) {
          logger.info("getReviewOfFollowers");
          const { size, page, sortBy } = query;

          console.log(filmId, followingArr, size);

          const data = this.queryBuilder()
               .select(
                    "r.content",
                    "u.name",
                    "u.avatarUrl",
                    "r.rating",
                    "u.id as userId",
                    "r.createdAt"
               )
               .from("review as r")
               .join("film as f", "r.filmId", "f.id")
               .join("user as u", "r.reviewedBy", "u.id")
               .whereIn("r.reviewedBy", followingArr)
               .andWhere("f.id", filmId)
               .limit(size!);

          return data;
     }

     static async getByUserId(userId: number) {
          logger.info("getUserById");

          const data = this.queryBuilder()
               .select(
                    "review.id as reviewId",
                    "review.reviewedBy",
                    "review.content",
                    "review.rating",
                    "review.createdAt",
                    "film.id as filmId",
                    "film.posterUrl",
                    "film.title",
                    "film.releaseDate"
               )
               .table("review")
               .join("film", "review.filmId", "film.id")
               .orderBy("review.createdAt", "desc")
               .limit(3)
               .where("review.reviewedBy", userId);

          return data;
     }

     static async count(filmId: number) {
          logger.info("count");

          const data = this.queryBuilder()
               .count("*")
               .table("user")
               .join("review", "user.id", "review.reviewedBy")
               .where("review.filmId", filmId)
               .first();

          return data;
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

     static async getRating(filmId: number, userId: number) {
          const data = await this.queryBuilder()
               .table("review")
               .select("rating")
               .where({ filmId, reviewedBy: userId })
               .orderBy("createdAt", "desc")
               .first();

          return data;
     }

     static async getReview(reviewId: number) {
          logger.info("getReview");
          const data = this.queryBuilder()
               .select(
                    "review.id as reviewId",
                    "review.content",
                    "review.rating",
                    "review.createdAt",
                    "film.id as filmId",
                    "film.title",
                    "film.posterUrl",
                    "film.releaseDate",
                    "user.id as userId",
                    "user.name",
                    "user.avatarUrl"
               )
               .table("film")
               .join("review", "film.id", "review.filmId")
               .join("user", "user.id", "review.reviewedBy")
               .where("review.id", reviewId)
               .first();

          return data;
     }
}
