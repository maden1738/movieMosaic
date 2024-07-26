import { table } from "console";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";

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

     static async getLikedMovies(userId: string) {
          logger.info("getLikedMovies");
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
               .where("likes.userId", userId);

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

          console.log(data);

          if (data.count > 0) {
               return true;
          }

          return false;
     }
}
