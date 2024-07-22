import { BaseModel } from "./base";

export class WatchListModel extends BaseModel {
     static async addToWatchlist(movieId: string, userId: string) {
          const dataToBeInserted = {
               filmId: movieId,
               userId: userId,
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
               .where("watchList.userId", userId);

          return data;
     }

     static async deleteFromWatchList(movieId: string, userId: string) {
          await this.queryBuilder().delete().table("watchList").where({
               userId,
               filmId: movieId,
          });
     }

     static async getMovie(movieId: string, userId: string) {
          return await this.queryBuilder()
               .select("id")
               .table("watchList")
               .where({ userId, filmId: movieId });
     }
}
