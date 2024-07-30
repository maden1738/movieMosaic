import axiosInstance from "../../axios";
import { IFilm } from "../../interface/film";
import { IReviewWithFilm } from "../../interface/review";
import {
  convertIntoStar,
  extractDate,
  extractYear,
} from "../../utils/formatter";
import { IUser } from "../../interface/user";

const profileUserNameEl = document.getElementById(
  "profile-user-name",
) as HTMLDivElement;
const recentActivityEl = document.getElementById(
  "recent-activity",
) as HTMLDivElement;
const watchedLink = document.getElementById(
  "watched-link",
) as HTMLAnchorElement;
const filmsEl = document.getElementById("no-of-films") as HTMLDivElement;
const followersEl = document.getElementById("followers") as HTMLDivElement;
const followingEl = document.getElementById("following") as HTMLDivElement;
const filmsLink = document.getElementById("films-link") as HTMLAnchorElement;
const reviewsEl = document.getElementById("recent-reviews") as HTMLDivElement;
const editProfile = document.getElementById(
  "edit-profile",
) as HTMLButtonElement;
const followBtn = document.getElementById("follow-btn") as HTMLButtonElement;
const followersLink = document.getElementById(
  "followers-link",
) as HTMLAnchorElement;
const followingLink = document.getElementById(
  "following-link",
) as HTMLAnchorElement;

let params = new URL(document.location.toString()).searchParams;
const id = params.get("id");
watchedLink.href = `../userFilms/?id=${id}&content=watched`;
followersLink.href = `../follow/?id=${id}&content=followers`;
followingLink.href = `../follow/?id=${id}&content=following`;
let followingStatus = false;

document.addEventListener("DOMContentLoaded", async () => {
  filmsLink.href = `../userFilms/?id=${id}&content=watched`;

  const user = JSON.parse(localStorage.getItem("user") as string);

  if (user.id && user.id === id) {
    editProfile.classList.remove("hidden");
  }

  if (user.id && user.id != id) {
    followBtn.classList.remove("hidden");
    followingStatus = await isFollowingUser(user.id, id!);
  }

  renderFollowButton();
  displayUserName();
  fetchNoOfFollowers();
  fetchNoOfFollowing();
  fetchRecentActivity();
  fetchRecentReviews();
});

followBtn.addEventListener("click", async () => {
  if (followingStatus) {
    await axiosInstance.delete(`/users/${id}/follow`);
  } else {
    await axiosInstance.post(`users/${id}/follow`);
  }
  followingStatus = !followingStatus;
  renderFollowButton();
});

async function displayUserName() {
  const response = await axiosInstance.get(`/users/${id}`);
  profileUserNameEl.innerHTML = response.data.data.name;
}

async function isFollowingUser(userId: string, followingId: string) {
  try {
    const response = await axiosInstance.get(`/users/${userId}/follow`);

    const followingList = response.data.data;

    return followingList.some((user: IUser) => user.id === followingId);
  } catch (error) {
    console.log(error);
  }
}

async function fetchRecentReviews() {
  const response = await axiosInstance.get(`/users/${id}/reviews/`);

  let { data } = response.data;

  data = data.map((el: IReviewWithFilm) => {
    let createdAt = extractDate(el.createdAt);
    let releaseDate = extractYear(el.releaseDate);

    return { ...el, createdAt, releaseDate };
  });

  renderRecentReviews(data);
}

async function fetchRecentActivity() {
  const response = await axiosInstance.get(
    `/users/${id}/watched?size=4&sortBy=whenAddedDesc`,
  );

  renderNoOfWatchedMovies(response.data.meta.total);
  renderRecentMovies(response.data.data);
}

async function fetchNoOfFollowers() {
  const response = await axiosInstance.get(`/users/${id}/followers`);
  renderFollowers(response.data.data.length);
}

async function fetchNoOfFollowing() {
  const response = await axiosInstance.get(`/users/${id}/follow`);
  renderFollowing(response.data.data.length);
}

function renderFollowButton() {
  if (followingStatus) {
    followBtn.innerHTML = "following";
  } else {
    followBtn.innerHTML = "follow";
  }
}

function renderFollowers(noOfFollowers: number) {
  followersEl.innerHTML = String(noOfFollowers);
}

function renderNoOfWatchedMovies(noOfFIlms: string) {
  filmsEl.innerHTML = String(noOfFIlms);
}

function renderFollowing(noOfFollowing: number) {
  followingEl.innerHTML = String(noOfFollowing);
}

function renderRecentMovies(data: Array<IFilm>) {
  data.forEach((film) => {
    const link = document.createElement("a");
    link.href = `../singleFilm/?id=${parseInt(film.id)}`;
    const recentfilmContainer = document.createElement("div");
    recentfilmContainer.className = "rounded-md overflow-hidden";
    const poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w500${film.posterUrl}`;
    recentfilmContainer.appendChild(poster);
    link.appendChild(recentfilmContainer);

    recentActivityEl.appendChild(link);
  });
}

function renderRecentReviews(reviewes: Array<IReviewWithFilm>) {
  reviewes.forEach((review) => {
    if (!review.content) {
      return;
    }

    const rating = convertIntoStar(review.rating);

    const divEl = document.createElement("div");

    divEl.innerHTML = `<div class="grid-cols-layout2 grid gap-4 pb-5">
          <a class="h-[105px] w-[70px] overflow-hidden rounded-md" href="../singleFilm/?id=${review.filmId}" >
            <img src="https://image.tmdb.org/t/p/w500${review.posterUrl}" alt="film poster" />
          </a>
          <div >
            <div>
              <a class="text-xl font-bold text-white hover:text-accent2" href="../singleFilm/?id=${review.filmId} " >${review.title}</a>
              <span class="pl-2 font-light text-text">${review.releaseDate}</span>
            </div>
            <div class="flex items-center mt-1">
              <span class="text-sm font-semibold text-accent flex items-center">${rating}</span>
              <span class="pl-2 text-xs text-subText">${review.createdAt}</span>
            </div>
            <div class="mt-2 text-sm text-text">
              ${review.content}
            </div>
          </div>
        </div>`;
    reviewsEl.appendChild(divEl);
  });
}
