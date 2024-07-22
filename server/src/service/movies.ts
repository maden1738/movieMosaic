import { NotFoundError } from "../errors/NotFoundError";
import { GetMoviesQuery } from "../interface/movies";
import { MoviesModel } from "../model/movies";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserService");

export async function getMovies(query: GetMoviesQuery) {
     logger.info("getMovies");

     const data = await MoviesModel.getMovies(query);

     const count = await MoviesModel.count(query);

     const meta = {
          page: query.page,
          size: data.length,
          total: +count.count,
     };

     return { meta, data };
}

export async function getMoviesById(id: string) {
     logger.info("getMoviesById");
     const data = await MoviesModel.getMoviesById(id);

     if (!data) {
          throw new NotFoundError(`Film with id: ${id} not found`);
     }

     return data;
}
