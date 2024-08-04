import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";
import { GetMoviesQuery } from "../interface/movies";

const logger = loggerWithNameSpace("likedMoviesModel");

export class LikedMoviesModel extends BaseModel {
     static async likeMovie(filmId: string, userId: string) {
          logger.info("likeMovie");
          const dataToBeInserted = {
               userId,
               filmId,
          };

          await this.queryBuilder().insert(dataToBeInserted).table("likes");
     }

     static async get(userId: string, query: GetMoviesQuery) {
          logger.info("getLikedMovies");

          const { size, page, sortBy } = query;

          const data = this.queryBuilder()
               .select(
                    "film.id",
                    "film.film_id",
                    "film.title",
                    "film.poster_url",
                    "film.release_date"
               )
               .table("film")
               .join("likes", "film.id", "likes.filmId")
               .where("likes.userId", userId)
               .limit(size!)
               .offset((page! - 1) * size!);

          switch (sortBy) {
               case "releaseDateAsc":
                    data.orderBy("releaseDate", "asc");
                    break;
               case "ratingAsc":
                    data.orderBy("rating", "asc");
                    break;
               case "ratingDesc":
                    data.orderBy("rating", "desc");
                    break;
               case "popularityAsc":
                    data.orderBy("popularity", "asc");
                    break;
               case "popularityDesc":
                    data.orderBy("popularity", "desc");
                    break;
               case "whenAddedAsc":
                    data.orderBy("likes.createdAt", "asc");
                    break;
               case "whenAddedDesc":
                    data.orderBy("likes.createdAt", "desc");
                    break;
               default:
                    data.orderBy("releaseDate", "desc");
          }

          return data;
     }

     static async count(userId: string) {
          logger.info("count");
          const data = this.queryBuilder()
               .count("*")
               .table("film")
               .join("likes", "film.id", "likes.filmId")
               .where("likes.userId", userId)
               .first();

          return data;
     }

     static async getMovie(filmId: string, userId: string) {
          return await this.queryBuilder()
               .select("id")
               .table("likes")
               .where({ userId, filmId });
     }

     static async deleteLikedMovies(filmId: string, userId: string) {
          await this.queryBuilder().delete().table("likes").where({
               userId,
               filmId,
          });
     }

     static async getStatus(filmId: string, userId: string) {
          const data = await this.queryBuilder()
               .count("* as count")
               .table("likes")
               .where({ userId, filmId })
               .first();

          if (data.count > 0) {
               return true;
          }

          return false;
     }
}
