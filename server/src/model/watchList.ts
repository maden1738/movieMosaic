import { BaseModel } from "./base";

export class WatchListModel extends BaseModel {
     static async create(filmId: string, userId: string, watched: boolean) {
          const dataToBeInserted = {
               filmId,
               userId,
               watched,
          };

          await this.queryBuilder()
               .insert(dataToBeInserted)
               .table("watch_list");
     }

     static async getWatchlist(userId: string) {
          const data = this.queryBuilder()
               .select(
                    "film.id",
                    "film.film_id",
                    "film.title",
                    "film.poster_url",
                    "film.release_date"
               )
               .table("film")
               .join("watchList", "film.id", "watchList.filmId")
               .where("watchList.userId", userId)
               .where("watched", false);

          return data;
     }

     static async getWatchedMovies(userId: string) {
          const data = this.queryBuilder()
               .select(
                    "film.id",
                    "film.film_id",
                    "film.title",
                    "film.poster_url",
                    "film.release_date"
               )
               .table("film")
               .join("watchList", "film.id", "watchList.filmId")
               .where("watchList.userId", userId)
               .where("watched", true);

          return data;
     }

     static async deleteFromWatchList(filmId: string, userId: string) {
          await this.queryBuilder().delete().table("watchList").where({
               userId,
               filmId,
               watched: false,
          });
     }
     static async deleteWatchedMovies(filmId: string, userId: string) {
          await this.queryBuilder().delete().table("watchList").where({
               userId,
               filmId,
               watched: true,
          });
     }

     static async getMovie(filmId: string, userId: string, watched: boolean) {
          return await this.queryBuilder()
               .select("id")
               .table("watchList")
               .where({ userId, filmId, watched });
     }

     static async getStatus(filmId: string, userId: string, watched: boolean) {
          const data = await this.queryBuilder()
               .count("* as count")
               .table("watchList")
               .where({ userId, filmId })
               .where({ watched })
               .first();

          if (data.count > 0) {
               return true;
          }

          return false;
     }
}
