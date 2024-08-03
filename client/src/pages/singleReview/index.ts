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
  renderUserInfo();
  fetchReview();
});

async function fetchReview() {
  try {
    const response = await axiosInstance.get(`/reviews/${id}`);
    renderReview(response.data.data);
  } catch (error) {
    console.log(error);
  }
}

function renderUserInfo() {
  const user = JSON.parse(localStorage.getItem("user") as string);
  avatarEl.src = user.avatarUrl;
  nameEl.innerHTML = user.name;
  nameEl.href = `.././profile/?id=${user.id}`;
}

function renderReview(review: IReviewWithFilm) {
  filmTitleEl.innerHTML = review.title;
  filmTitleEl.href = `.././singleFilm/?id=${review.filmId}`;
  ratingEl.innerHTML = convertIntoStar(review.rating);
  releaseDateEl.innerHTML = extractYear(review.releaseDate);
  reviewDateEl.innerHTML = extractDate(review.createdAt);
  filmPosterEl.src = `https://image.tmdb.org/t/p/w500${review.posterUrl}`;
  reviewContentEl.innerHTML = review.content || "";
}
