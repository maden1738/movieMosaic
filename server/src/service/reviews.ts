import { BadRequestError } from "../errors/BadRequestError";
import { Review } from "../interface/reviews";
import { ReviewsModel } from "../model/reviews";
import { getMoviesById } from "./movies";

export async function createReviews(
     filmId: number,
     userId: number,
     review: Review
) {
     const data = await getMoviesById(String(filmId));

     if (!data) {
          throw new BadRequestError(`movie with id: ${filmId} doesnt exist`);
     }
     await ReviewsModel.create(filmId, userId, review);
}

export async function getReviews(filmId: number) {
     const data = await getMoviesById(String(filmId));

     if (!data) {
          throw new BadRequestError(`movie with id: ${filmId} doesnt exist`);
     }

     return await ReviewsModel.getByFilmId(filmId);
}

export async function updateReview(
     reviewId: number,
     userId: number,
     review: Review
) {
     const data = await ReviewsModel.getById(reviewId);

     if (!data) {
          throw new BadRequestError("Review doesnt exist");
     }

     if (data.reviewedBy !== userId) {
          throw new BadRequestError("cant update comment of other users");
     }

     await ReviewsModel.update(reviewId, review);
}
