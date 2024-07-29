import { IFilm } from "./film";

export interface IReview {
  reviewId: string;
  userId: string;
  name: string;
  avatarUrl: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface IReviewWithFilm extends IFilm {
  reviewId: string;
  content: string;
  rating: number;
  createdAt: string;
}
