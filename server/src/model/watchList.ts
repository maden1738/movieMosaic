import { GetMoviesQuery } from "../interface/movies";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";

const logger = loggerWithNameSpace("watchListModel");

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

     static async getWatchlist(userId: string, query: GetMoviesQuery) {
          logger.info("getWatchlist");

          const { q, size, page, sortBy } = query;

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
               .where("watched", false)
               .limit(size!)
               .offset((page! - 1) * size!);

          if (q) {
               data.where("film.title", "ilike", `%${q}%`);
          }

          switch (sortBy) {
               case "filmName":
                    data.orderBy("title");
                    break;
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
                    data.orderBy("watchList.createdAt", "asc");
                    break;
               case "whenAddedDesc":
                    data.orderBy("watchList.createdAt", "desc");
                    break;
               default:
                    data.orderBy("releaseDate", "desc");
          }

          return data;
     }

     static async count(userId: string, query: GetMoviesQuery) {
          logger.info("count");

          const { q } = query;

          const data = this.queryBuilder()
               .count("*")
               .table("watchList")
               .where({ userId })
               .where({ watched: false })
               .first();

          if (q) {
               data.whereLike("title", `%${q}%`);
          }

          return data;
     }

     static async getWatchedMovies(userId: string, query: GetMoviesQuery) {
          logger.info("getWatchedMovies");
          const { q, size, page, sortBy } = query;

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
               .where("watched", true)
               .limit(size!)
               .offset((page! - 1) * size!);

          if (q) {
               data.where("film.title", "ilike", `%${q}%`);
          }

          switch (sortBy) {
               case "filmName":
                    data.orderBy("title");
                    break;
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
                    data.orderBy("watchList.createdAt", "asc");
                    break;
               case "whenAddedDesc":
                    data.orderBy("watchList.createdAt", "desc");
                    break;
               default:
                    data.orderBy("releaseDate", "desc");
          }

          return data;
     }

     static async countWatchedMovies(userId: string, query: GetMoviesQuery) {
          logger.info("countWatchedMovies");

          const { q } = query;

          const data = this.queryBuilder()
               .count("*")
               .table("watchList")
               .where({ userId })
               .where({ watched: true })
               .first();

          if (q) {
               data.whereLike("title", `%${q}%`);
          }

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
