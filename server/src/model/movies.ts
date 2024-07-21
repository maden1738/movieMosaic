import { GetMoviesQuery } from "../interface/movies";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";

const logger = loggerWithNameSpace("MoviesModel");

export class MoviesModel extends BaseModel {
     static async getMovies(query: GetMoviesQuery) {
          logger.info("getMovies");

          const { q, size, page, sortBy } = query;

          const data = this.queryBuilder()
               .select("film_id", "title", "poster_url", "release_date")
               .table("film")
               .limit(size!)
               .offset((page! - 1) * size!);

          if (q) {
               data.where("title", "ilike", `%${q}%`);
          }

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
               default:
                    data.orderBy("releaseDate", "desc");
          }

          return data;
     }

     static async count(query: GetMoviesQuery) {
          logger.info("getMovies");

          const { q } = query;

          const data = this.queryBuilder().count("*").table("film").first();

          if (q) {
               data.whereLike("title", `%${q}%`);
          }

          return data;
     }

     static async getMoviesById(id: string) {
          logger.info("getMoviesById");

          const data = await this.queryBuilder()
               .select(
                    "film_id",
                    "title",
                    "poster_url",
                    "backdrop_url",
                    "release_date",
                    "rating_count",
                    "rating",
                    "trailer",
                    "popularity",
                    "overview"
               )
               .table("film")
               .where("film_id", id);

          if (data.length > 0) {
               return data[0];
          }
     }
}
