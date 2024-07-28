import { NotFoundError } from "../errors/NotFoundError";
import { GetMoviesQuery } from "../interface/movies";
import { GetReviewsQuery, Review } from "../interface/reviews";
import { MoviesModel } from "../model/movies";
import loggerWithNameSpace from "../utils/logger";
import * as ReviewsService from "../service/reviews";

const logger = loggerWithNameSpace("UserService");

export async function getMovies(query: GetMoviesQuery) {
     logger.info("getMovies");

     const data = await MoviesModel.get(query);

     const count = await MoviesModel.count(query);

     const { size } = query;
     const total = +count.count;

     const meta = {
          page: query.page,
          size: data.length,
          total,
          totalPages: Math.ceil(total / size!),
     };

     return { meta, data };
}

export async function getMoviesById(id: string) {
     logger.info("getMoviesById");
     const data = await MoviesModel.getById(+id);

     if (!data) {
          throw new NotFoundError(`Film with id: ${id} not found`);
     }

     return data;
}

export async function createReviews(
     filmId: number,
     userId: number,
     review: Review
) {
     await ReviewsService.createReviews(filmId, userId, review);
}
export async function getReviews(filmId: number, query: GetReviewsQuery) {
     return await ReviewsService.getReviews(filmId, query);
}

export async function updateReview(
     reviewId: number,
     userId: number,
     review: Review
) {
     await ReviewsService.updateReview(reviewId, userId, review);
}
