import { BadRequestError } from "../errors/BadRequestError";
import { GetReviewsQuery, Review } from "../interface/reviews";
import { ReviewsModel } from "../model/reviews";
import { getMoviesById } from "./movies";
import * as FollowListService from "./followList";

export async function createReviews(
  filmId: number,
  userId: number,
  review: Review
) {
  const data = await getMoviesById(String(filmId));

  if (!data) {
    throw new BadRequestError(`movie with id: ${filmId} doesnt exist`);
  }
  return await ReviewsModel.create(filmId, userId, review);
}

export async function getReviews(filmId: number, query: GetReviewsQuery) {
  const response = await getMoviesById(String(filmId));

  if (!response) {
    throw new BadRequestError(`movie with id: ${filmId} doesnt exist`);
  }

  const data = await ReviewsModel.getByFilmId(filmId, query);
  const count = await ReviewsModel.count(filmId);

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

export async function getReviewByUserId(
  userId: number,
  query: GetReviewsQuery
) {
  return await ReviewsModel.getByUserId(userId, query);
}

export async function getRating(filmId: string, userId: string) {
  return await ReviewsModel.getRating(+filmId, +userId);
}

export async function getReviewDetail(reviewId: number) {
  return await ReviewsModel.getReview(reviewId);
}

export async function getReviewOfFollowing(
  filmId: string,
  userId: string,
  query: GetReviewsQuery
) {
  const followersId = await FollowListService.getFollowing(+userId);
  const followersIdArr = followersId.map((follower) => follower.id);

  return await ReviewsModel.getByFollowingIds(filmId, followersIdArr, query);
}
