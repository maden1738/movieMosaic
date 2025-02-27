import { table } from "console";
import { GetMoviesQuery, IMovie } from "../interface/movies";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";

const logger = loggerWithNameSpace("MoviesModel");

export class MoviesModel extends BaseModel {
     static async get(query: GetMoviesQuery) {
          logger.info("getMovies");

          const { q, size, page, sortBy } = query;

          const data = this.queryBuilder()
               .select("id", "film_id", "title", "poster_url", "release_date")
               .table("film")
               .limit(size!)
               .offset((page! - 1) * size!);

          if (q) {
               data.where("title", "ilike", `%${q}%`);
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

               default:
                    data.orderBy("releaseDate", "desc");
          }

          return data;
     }

     static async count(query: GetMoviesQuery) {
          logger.info("count");

          const { q } = query;

          const data = this.queryBuilder().count("*").table("film").first();

          if (q) {
               data.whereLike("title", `%${q}%`);
          }

          return data;
     }

     static async create(film: IMovie, userId: number) {
          logger.info("create");

          const dataToBeInserted = {
               title: film.title,
               posterUrl: film.posterUrl,
               backdropUrl: film.backdropUrl,
               releaseDate: film.releaseDate,
               trailer: film.trailer,
               popularity: film.popularity,
               overview: film.overview,
               createdBy: userId,
          };

          await this.queryBuilder().table("film").insert(dataToBeInserted);
     }

     static async getById(id: number) {
          logger.info("getMoviesById");

          const data = await this.queryBuilder()
               .select(
                    "id",
                    "film_id",
                    "title",
                    "trailer",
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
               .where("id", id);

          if (data.length > 0) {
               return data[0];
          }
     }
}
