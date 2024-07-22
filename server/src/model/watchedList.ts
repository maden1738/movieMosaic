import { BaseModel } from "./base";

export class WatchedListModel extends BaseModel {
     static async addToWatchedlist(movieId: string, userId: string) {
          const dataToBeInserted = {
               filmId: movieId,
               userId: userId,
          };

          await this.queryBuilder()
               .insert(dataToBeInserted)
               .table("watched_list");
     }

     static async getWatchedList(userId: string) {
          const data = this.queryBuilder()
               .select(
                    "film.id",
                    "film.film_id",
                    "film.title",
                    "film.poster_url",
                    "film.release_date"
               )
               .table("film")
               .join("watchedList", "film.id", "watchedList.filmId")
               .where("watchedList.userId", userId);

          return data;
     }

     static async deleteFromWatchedList(movieId: string, userId: string) {
          await this.queryBuilder().delete().table("watchedList").where({
               userId,
               filmId: movieId,
          });
     }

     static async getMovie(movieId: string, userId: string) {
          return await this.queryBuilder()
               .select("id")
               .table("watchedList")
               .where({ userId, filmId: movieId });
     }
}
