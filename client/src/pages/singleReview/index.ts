import axiosInstance from "../../axios";
import { IReviewWithFilm } from "../../interface/review";
import {
  convertIntoStar,
  extractDate,
  extractYear,
} from "../../utils/formatter";

const avatarEl = document.getElementById("avatar") as HTMLImageElement;
const nameEl = document.getElementById("review-user-name") as HTMLAnchorElement;
const filmTitleEl = document.getElementById(
  "review-film-title",
) as HTMLAnchorElement;
const releaseDateEl = document.getElementById(
  "release-date",
) as HTMLSpanElement;
const reviewDateEl = document.getElementById("review-date") as HTMLSpanElement;
const filmPosterEl = document.getElementById(
  "review-film-poster",
) as HTMLImageElement;
const reviewContentEl = document.getElementById(
  "review-content",
) as HTMLSpanElement;
const ratingEl = document.getElementById("rating-stars") as HTMLDivElement;

let params = new URL(document.location.toString()).searchParams;
const id = params.get("id");

document.addEventListener("DOMContentLoaded", () => {
  fetchReview();
});

async function fetchReview() {
  try {
    const response = await axiosInstance.get(`/reviews/${id}`);
    renderReview(response.data.data);
  } catch (error) {}
}

function renderReview(review: IReviewWithFilm) {
  avatarEl.src = review.avatarUrl;
  nameEl.innerHTML = review.name;
  nameEl.href = `.././profile/?id=${review.userId}`;
  filmTitleEl.innerHTML = review.title;
  filmTitleEl.href = `.././singleFilm/?id=${review.filmId}`;
  ratingEl.innerHTML = convertIntoStar(review.rating);
  releaseDateEl.innerHTML = extractYear(review.releaseDate);
  reviewDateEl.innerHTML = extractDate(review.createdAt);
  filmPosterEl.src = review.posterUrl;
  reviewContentEl.innerHTML = review.content || "";
}
