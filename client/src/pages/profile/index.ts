import axiosInstance from "../../axios";
import { IReviewWithFilm } from "../../interface/review";
import {
  convertIntoStar,
  extractDate,
  extractYear,
} from "../../utils/formatter";
import { IUser } from "../../interface/user";
import { ILogsResponse } from "../../interface/log";

const profileUserNameEl = document.getElementById(
  "profile-user-name",
) as HTMLDivElement;
const recentActivityEl = document.getElementById(
  "recent-activity",
) as HTMLDivElement;
const watchedLink = document.getElementById(
  "watched-link",
) as HTMLAnchorElement;
const diaryLink = document.getElementById("diary-link") as HTMLAnchorElement;
const filmsEl = document.getElementById("no-of-films") as HTMLDivElement;
const followersEl = document.getElementById("followers") as HTMLDivElement;
const followingEl = document.getElementById("following") as HTMLDivElement;
const filmsLink = document.getElementById("films-link") as HTMLAnchorElement;
const reviewsLink = document.getElementById(
  "reviews-link",
) as HTMLAnchorElement;
const reviewsEl = document.getElementById("recent-reviews") as HTMLDivElement;
const editProfile = document.getElementById(
  "edit-profile",
) as HTMLAnchorElement;
const followBtn = document.getElementById("follow-btn") as HTMLButtonElement;
const followersLink = document.getElementById(
  "followers-link",
) as HTMLAnchorElement;
const followingLink = document.getElementById(
  "following-link",
) as HTMLAnchorElement;
const profilePictureEl = document.getElementById(
  "profile-picture",
) as HTMLImageElement;
const bioEl = document.getElementById("bio") as HTMLParagraphElement;

let params = new URL(document.location.toString()).searchParams;
const id = params.get("id");

watchedLink.href = `../userFilms/?id=${id}&content=watched`;
diaryLink.href = `../diary/?id=${id}`;
followersLink.href = `../follow/?id=${id}&content=followers`;
followingLink.href = `../follow/?id=${id}&content=following`;
let followingStatus = false;

document.addEventListener("DOMContentLoaded", async () => {
  filmsLink.href = `../userFilms/?id=${id}&content=watched`;
  reviewsLink.href = `../userReviews/?id=${id}`;

  const user = JSON.parse(localStorage.getItem("user") as string);

  if (user && user.id && user.id === id) {
    editProfile.classList.remove("hidden");
    editProfile.href = `../account/?id=${id}`;
  }

  if (user && user.id && user.id != id) {
    followBtn.classList.remove("hidden");
    followingStatus = await isFollowingUser(user.id, id!);
  }

  renderFollowButton();
  displayUserName();
  fetchNoOfFollowers();
  fetchNoOfFollowing();
  fetchNoOfMovies();
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
  profilePictureEl.src = response.data.data.avatarUrl;
  bioEl.innerText = response.data.data.bio;
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
  const response = await axiosInstance.get(`/users/${id}/reviews/?size=3`);

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
    `/users/${id}/logs?size=4&sortBy=whenAddedDesc`,
  );

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

async function fetchNoOfMovies() {
  const response = await axiosInstance.get(`/users/${id}/watched?size=1`);

  renderNoOfWatchedMovies(response.data.meta.total);
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

function renderRecentMovies(data: Array<ILogsResponse>) {
  if (data.length === 0) {
    recentActivityEl.className =
      "text-center text-text uppercase min-h-[50px] pt-5 font-light";
    return;
  }

  recentActivityEl.innerHTML = "";
  data.forEach((film) => {
    let ratingStars = "";
    if (film.rating) {
      ratingStars = convertIntoStar(film.rating);
    }

    const link = document.createElement("a");
    link.href = `../singleFilm/?id=${parseInt(film.filmId)}`;
    const recentfilmContainer = document.createElement("div");
    recentfilmContainer.className =
      "overflow-hidden rounded-lg  hover:outline outline-[4px] outline-offset-[-3px] outline-accent transition-all duration-200 ease-in";
    const poster = document.createElement("img");
    poster.src = film.posterUrl;
    recentfilmContainer.appendChild(poster);
    const divEl = document.createElement("div");
    divEl.style.height = "16px";

    divEl.innerHTML = `
      <div class="${film.rating ? "text-[9px] inline text-subText" : "hidden"}">${ratingStars}</div>
      <div class="${film.likeStatus ? "inline" : "hidden"}">
        <i class="fa-solid fa-heart text-[10px] text-subText"></i>
      </div>
      <a  href=".././singleReview/?id=${film.reviewId}" class="${film.content ? "inlin" : "hidden"}  ">
        <i class="fa-solid fa-ticket-simple text-[10px] text-subText hover:text-white"></i>
      </a>
    `;
    link.appendChild(recentfilmContainer);
    link.appendChild(divEl);

    recentActivityEl.appendChild(link);
  });
}

function renderRecentReviews(reviews: Array<IReviewWithFilm>) {
  if (reviews.length === 0) {
    reviewsEl.className =
      "text-center text-text uppercase min-h-[50px] pt-5 font-light";
    return;
  }

  reviewsEl.innerHTML = "";
  reviews.forEach((review) => {
    if (!review.content) {
      return;
    }

    const rating = convertIntoStar(review.rating);

    const divEl = document.createElement("div");

    divEl.innerHTML = `<div class="grid-cols-layout2 grid gap-4 pb-5">
          <a class="h-[105px] w-[70px] overflow-hidden rounded-md " href="../singleFilm/?id=${review.filmId}" >
            <img src="${review.posterUrl}" alt="film poster" />
          </a>
          <div >
            <div>
              <a class="text-xl  pr-2 font-bold text-white hover:text-accent2" href="../singleFilm/?id=${review.filmId}" >${review.title}</a>
              <span class="font-light text-text">${review.releaseDate}</span>
            </div>
            <div class=" mt-1 gap-3 items-center flex">
              <span class="text-xs text-subText">Watched ${review.createdAt}</span>
              <span class="text-xs  text-accent flex items-center pb-1">${rating}</span>
            </div>
            <div class="mt-2 text-sm text-text lg:text-base lg:mt-3">
              ${review.content}
            </div>
          </div>
        </div>`;
    reviewsEl.appendChild(divEl);
  });
}
