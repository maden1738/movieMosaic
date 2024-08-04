import axiosInstance from "../../axios";
import { IReviewWithFilm } from "../../interface/review";
import {
  convertIntoStar,
  extractDate,
  extractYear,
} from "../../utils/formatter";
import { IUser } from "../../interface/user";

const contentEl = document.getElementById("content") as HTMLElement;
const titleProfilePicEl = document.getElementById(
  "title-profile-pic",
) as HTMLImageElement;
const titleNameEl = document.getElementById("title-name") as HTMLAnchorElement;

let params = new URL(document.location.toString()).searchParams;
const id = params.get("id");

document.addEventListener("DOMContentLoaded", () => {
  fetchUserInfo();
  fetchReviews();
});

async function fetchUserInfo() {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    renderUserInfo(response.data.data);
  } catch (error) {
    console.log(error);
  }
}

async function fetchReviews() {
  try {
    const response = await axiosInstance.get(`/users/${id}/reviews`);
    renderReviews(response.data.data);
  } catch (error) {
    console.log(error);
  }
}

function renderUserInfo(data: IUser) {
  titleProfilePicEl.src = data.avatarUrl;
  titleNameEl.innerHTML = data.name;
  titleNameEl.href = `.././profile/?id=${id}`;
}

function renderReviews(reviews: Array<IReviewWithFilm>) {
  reviews.forEach((review) => {
    if (!review.content) return;

    const rating = convertIntoStar(review.rating);
    const releaseDate = extractYear(review.releaseDate);
    const watchedDate = extractDate(review.createdAt);
    const divEl = document.createElement("div");
    divEl.innerHTML = `
     <div class="grid grid-cols-layout2 gap-4 mb-6">
          <div class="overflow-hidden rounded-md">
            <img src="${review.posterUrl}" alt="film-poster" />
          </div>
          <div>
            <div>
              <a href=".././singleFilm/${review.filmId}" class="inline pr-2 text-xl font-semibold text-white hover:text-accent2"
                >${review.title}</a
              >
              <span class="font-light text-text">${releaseDate}</span>
            </div>
            <div>
              <div class="inline pr-1 text-xs text-accent">
               ${rating}
              </div>
              <span class="text-xs text-subText"> Watched on ${watchedDate} </span>
            </div>
            <p class="mt-2 text-sm text-text">
              ${review.content}
            </p>
          </div>
     </div>`;
    contentEl.appendChild(divEl);
  });
}
