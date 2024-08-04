import { IFilm } from "../../interface/film";
import {
  convertIntoStar,
  convertRating,
  extractYear,
} from "../../utils/formatter";
import axiosInstance from "../../axios";
import { IReview } from "../../interface/review";
import { handleSearchItemClick } from "../../common/navbar";
import Swal from "sweetalert2";

const movieDetailsEl = document.getElementById(
  "movie-details",
) as HTMLDivElement;
const friendReviewSection = document.getElementById(
  "friend-reviews-section",
) as HTMLElement;

// checking if user is logged in
let isUserLoggedIn = false;
const USER = JSON.parse(localStorage.getItem("user") as string);

if (USER) {
  isUserLoggedIn = true;
}

// getting filmId from url
let params = new URL(document.location.toString()).searchParams;
const id = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let likedStatus = false;
    let watchedStatus = false;
    let watchListStatus = false;

    const response = await axiosInstance.get(`/movies/${id}`);
    const filmId = response.data.data.id;

    // get film status for logged in user
    if (isUserLoggedIn) {
      const filmStatus = await axiosInstance.get(`/me/movie-status/${filmId}`);
      likedStatus = filmStatus.data.data.likedStatus;
      watchedStatus = filmStatus.data.data.watchedStatus;
      watchListStatus = filmStatus.data.data.watchListStatus;
    }

    renderMovieDetails(response.data.data);

    const userpanelEl = document.getElementById("userpanel") as HTMLDivElement;
    const userpanelOpenEl = document.getElementById(
      "userpanel-open",
    ) as HTMLButtonElement;
    const userpanelCloseEl = document.getElementById(
      "userpanel-close",
    ) as HTMLButtonElement;

    const logRatingEls = document.querySelectorAll(
      ".logRating",
    ) as NodeListOf<HTMLElement>;

    const logpanelOpenEl = document.getElementById(
      "logpanel-open",
    ) as HTMLDivElement;
    logpanelOpenEl.dataset.filmId = filmId;
    logpanelOpenEl.addEventListener("click", handleSearchItemClick);

    logRatingEls.forEach((el) => {
      el.addEventListener("click", () => {});
    });

    if (!isUserLoggedIn) {
      userpanelOpenEl.classList.remove("flex");
      userpanelOpenEl.classList.add("hidden");
    }

    userpanelOpenEl.addEventListener("click", () => {
      userpanelEl.classList.remove("hidden");
      userpanelEl.classList.add("flex");
    });

    userpanelCloseEl.addEventListener("click", () => {
      userpanelEl.classList.add("hidden");
      userpanelEl.classList.remove("flex");
    });

    const watchEl = document.getElementById("watch") as HTMLDivElement;
    const watchIconEl = document.getElementById("watch-icon") as HTMLElement;
    const watchTextEl = document.getElementById("watch-text") as HTMLElement;

    const likeEl = document.getElementById("like") as HTMLDivElement;
    const likeIconEl = document.getElementById("like-icon") as HTMLElement;
    const likeTextEl = document.getElementById("like-text") as HTMLElement;

    const watchlistEl = document.getElementById("watchlist") as HTMLDivElement;
    const watchlistIconEl = document.getElementById(
      "watchlist-icon",
    ) as HTMLElement;

    renderIcon();

    watchEl.addEventListener("click", () => {
      try {
        if (!watchedStatus) {
          addToWatchedList(filmId);
          watchedStatus = true;
          renderIcon();
          return;
        }
        removeFromWatchedList(filmId);
        watchedStatus = false;
        renderIcon();
      } catch (error) {
        Swal.fire({
          title: "Something went wrong",
          color: "#ccdded",
          background: "#435666",
        });
      }
    });

    likeEl.addEventListener("click", () => {
      try {
        if (!likedStatus) {
          likeFilm(filmId);
          likedStatus = true;
          renderIcon();
          return;
        }

        removeLike(filmId);
        likedStatus = false;
        renderIcon();
      } catch (error) {
        Swal.fire({
          title: "Something went wrong",
          color: "#ccdded",
          background: "#435666",
        });
      }
    });

    watchlistEl.addEventListener("click", () => {
      try {
        if (!watchListStatus) {
          addToWatchList(filmId);
          watchListStatus = true;
          renderIcon();
          return;
        }
        removeFromWatchList(filmId);
        watchListStatus = false;
        renderIcon();
      } catch (error) {
        Swal.fire({
          title: "Something went wrong",
          color: "#ccdded",
          background: "#435666",
        });
      }
    });

    function renderIcon() {
      if (watchedStatus) {
        watchIconEl.style.color = "#05ab1e";
        watchTextEl.innerText = "Watched";
      } else {
        watchIconEl.style.color = "#99AABB";
        watchTextEl.innerText = "Watch";
      }

      if (likedStatus) {
        likeIconEl.classList.remove("fa-regular");
        likeIconEl.classList.add("fa-solid");
        likeIconEl.style.color = "#F27405";
        likeTextEl.innerHTML = "Remove";
      } else {
        likeIconEl.classList.remove("fa-solid");
        likeIconEl.classList.add("fa-regular");
        likeIconEl.style.color = "#99AABB";
        likeTextEl.innerHTML = "Like";
      }

      if (watchListStatus) {
        watchlistIconEl.classList.remove("fa-regular");
        watchlistIconEl.classList.add("fa-solid");
        watchlistIconEl.style.color = "#42bcf5";
      } else {
        watchlistIconEl.classList.remove("fa-solid");
        watchlistIconEl.classList.add("fa-regular");
        watchlistIconEl.style.color = "#99AABB";
      }
    }
  } catch (error) {
    Swal.fire({
      title: "Something went wrong",
      color: "#ccdded",
      background: "#435666",
    });
  }

  fetchRecentReviews();
  if (isUserLoggedIn) {
    fetchFriendReviews();
  }
});

function renderMovieDetails(data: IFilm) {
  let {
    title,
    posterUrl,
    backdropUrl,
    releaseDate,
    overview,
    ratingCount,
    rating,
    trailer,
  } = data;

  releaseDate = extractYear(releaseDate);
  rating = convertRating(rating);

  movieDetailsEl.innerHTML = `
  <section class = "relative">
      <div class="lg:px-[15%] rounded-md overflow-hidden bg-background ">
        <img src="${backdropUrl}" alt="backdrop photo" class="w-full object-contain lg:rounded-md brightness-50"  />
      </div>
       <button
        class="absolute right-4 top-5  flex aspect-square w-[24px] items-center justify-center gap-[2px] rounded-full bg-white lg:hidden"
        id="userpanel-open"
      >
        <span class="aspect-square w-1 rounded-full bg-subText"></span>
        <span class="aspect-square w-1 rounded-full bg-subText"></span>
        <span class="aspect-square w-1 rounded-full bg-subText"></span>
      </button>
      
    </section>

    <section class="wrapper flex justify-between lg:gap-6  ">
      <div class="pt-4 lg:order-2" >
        <div id="title" class="text-xl font-medium text-white max-w-[200px] lg:max-w-[400px] lg:text-3xl lg:font-bold">${title}</div>

        <div class="mt-4 text-sm text-subText lg:mt-2">DIRECTED BY</div>
        <div class="font-bold text-text">Swarna Jang Maden</div>

        <div class="mt-6 flex items-center gap-4 lg:mt-3">
          <a id="trailer" href="${trailer}">
            <button
              class="rounded-lg bg-primary px-2 py-[2px] text-sm text-text"
            >
              Trailer
            </button>
          </a>

          <div class="text-sm text-text" id="date">${releaseDate}</div>
        </div>     
        <p class="mt-8 text-subText lg:max-w-[40ch] lg:mt-4" id="overview">
          ${overview}
        </p>
      </div>

        <!-- userpanel -->
        <div
          class="fixed inset-0 z-10 hidden items-center justify-center bg-black bg-opacity-55 lg:static lg:inline lg:pt-10 lg:order-2 lg:bg-transparent w-auto "
          id="userpanel"
        >
          <section class="wrapper relative text-text lg:px-0  ">
            <button
              id="userpanel-close"
              class="lg:hidden absolute right-0 top-0 flex aspect-square w-[22px] translate-x-[-50%] translate-y-[-50%] cursor-pointer items-center justify-center rounded-full bg-orange shadow-lg"
            >
              <i class="fa-regular fa-x text-sm font-semibold"></i>
            </button>
            <div class="w-full bg-primaryDark rounded-xl ">
              <div class="text-text text-sm px-4 text-center py-4 ${isUserLoggedIn ? "hidden" : ""}">
                  Signin to rate, log or review
              </div>
              <div class="grid grid-cols-3 py-4 lg:gap-4 lg:px-4 ${isUserLoggedIn ? "" : "hidden"}">
                <div
                  class="group flex cursor-pointer flex-col items-center gap-1"
                  id="watch"
                >
                  <i class="fa-regular fa-eye text-3xl text-text" id="watch-icon"></i>
                  <p class="text-sm text-text group-hover:text-white" id="watch-text">Watch</p>
                </div>
                <div
                  class="group flex cursor-pointer flex-col items-center gap-1"
                  id="like"
                >
                  <i class="fa-regular fa-heart text-3xl text-text" id="like-icon"></i>
                  <div class="text-sm text-text group-hover:text-white" id="like-text">Like</div>
                </div>
                <div
                  class="group flex cursor-pointer flex-col items-center gap-1"
                  id="watchlist"
                >
                  <i class="fa-regular fa-clock text-3xl text-text" id="watchlist-icon"></i>
                  <div class="text-sm text-text group-hover:text-white" id="watchlist-text">
                    Watchlist
                  </div>
                </div>
              </div>
              <div class="h-[1px] bg-[#324654] ${isUserLoggedIn ? "" : "hidden"}"></div>  
              <div class="flex cursor-pointer flex-col items-center py-4 text-sm hover:text-white  ${isUserLoggedIn ? "" : "hidden"}" id="logpanel-open">
                Review or log
              </div>
            </div>
          </section>
        </div>

      <div class="pt-2 w-[110px] h-fit absolute right-[5%] lg:w-[230px] overflow-hidden rounded-xl lg:order-1 lg:static">
        <img src="${posterUrl}"" alt="poster" class = "w-full h-auto" />
      </div>
    </section>


    <!-- rating -->
    <section class="wrapper">
      <div class="mt-8 flex justify-between">
        <div class="text-xs text-text">RATINGS</div>
        <div class="text-xs text-subText" id="ratings-count">${ratingCount} VOTES</div>
      </div>

      <div class="mx-auto flex w-fit flex-col items-center">
        <div id="rating" class="mt-4 text-3xl text-text">${rating}</div>
        <div>
          <i class="fa-solid fa-star text-sm text-accent"></i>
          <i class="fa-solid fa-star text-sm text-accent"></i>
          <i class="fa-solid fa-star text-sm text-accent"></i>
          <i class="fa-solid fa-star text-sm text-accent"></i>
          <i class="fa-solid fa-star text-sm text-accent"></i>
        </div>
      </div>
    </section>`;
}

async function fetchRecentReviews() {
  try {
    const response = await axiosInstance.get(`/movies/${id}/reviews/?size=3`);

    renderRecentReviews(response.data.data);
  } catch (error) {
    Swal.fire({
      title: "Something went wrong",
      color: "#ccdded",
      background: "#435666",
    });
  }
}

async function fetchFriendReviews() {
  try {
    const response = await axiosInstance.get(
      `/users/${USER.id}/followers/reviews/movies/${id}?size=3`,
    );

    if (response.data.data.length === 0) {
      friendReviewSection.classList.add("hidden");
    }

    renderFriendReviews(response.data.data);
  } catch (error) {}
}

function renderRecentReviews(data: Array<IReview>) {
  const recentReviewEl = document.getElementById(
    "recent-reviews",
  ) as HTMLDivElement;
  const recentReviewLink = document.getElementById(
    "recent-reviews-link",
  ) as HTMLAnchorElement;

  recentReviewLink.href = `.././reviews/?id=${id}&content=recent`;

  recentReviewEl.innerHTML = "";

  data.forEach((review) => {
    if (!review.content) {
      return;
    }

    const rating = convertIntoStar(review.rating);

    const divEl = document.createElement("div");
    divEl.innerHTML = `<section class="py-4">
          <div class="flex items-center gap-1 text-sm text-subText">
            <div class="w-[18px] aspect-square overflow-hidden rounded-full">
              <a class="aspect-square w-[18px] overflow-hidden rounded-full" href=".././profile/?id=${review.userId}">
                <img
                src="${review.avatarUrl}"
                alt="profile picture"
                id="profile-picture"
                class="h-full w-full object-cover"
                />
              </a>
            </div>
            <span class="pl-1">Review By </span>
            <a id="username" class="font-semibold capitalize text-text" href=".././profile/?id=${review.userId}"
              >${review.name}</a
            >
            <span class="pl-1 text-accent flex items-center pb-1 text-xs" id="rating">${rating}</span>
            <!-- review content -->
          </div>
          <div class="mt-2 text-base text-subText" id="content">
            <p>${review.content}</p>
          </div>
        </section>
        <div class="border-[0.1px] border-[#8ea4b4]"></div>`;

    recentReviewEl.appendChild(divEl);
  });
}

function renderFriendReviews(data: Array<IReview>) {
  const friendReviewEl = document.getElementById(
    "friend-reviews",
  ) as HTMLDivElement;
  const friedReviewLink = document.getElementById(
    "friend-reviews-link",
  ) as HTMLAnchorElement;

  friedReviewLink.href = `.././reviews/?id=${id}&content=friend`;

  friendReviewEl.innerHTML = "";

  data.forEach((review) => {
    if (!review.content) {
      return;
    }

    const rating = convertIntoStar(review.rating);

    const divEl = document.createElement("div");
    divEl.innerHTML = `<section class="py-4">
          <div class="flex items-center gap-1 text-sm text-subText">
             <div class="w-[18px] aspect-square overflow-hidden rounded-full">
              <a class="aspect-square w-[18px] overflow-hidden rounded-full" href=".././profile/?id=${review.userId}">
                <img
                src="${review.avatarUrl}"
                alt="profile picture"
                id="profile-picture"
                class="h-full w-full object-cover"
                />
              </a>
            </div>
            <span class="pl-1">Review By </span>
            <a id="username" class="font-semibold capitalize text-text" href=".././profile/?id=${review.userId}"
              >${review.name}</a
            >
            <span class="pl-1 pb-1 text-accent flex items-center text-xs" id="rating">${rating}</span>
            <!-- review content -->
          </div>
          <div class="mt-2 text-base text-subText" id="content">
            <p>${review.content}</p>
          </div>
        </section>
        <div class="border-[0.1px] border-[#8ea4b4]"></div>`;

    friendReviewEl.appendChild(divEl);
  });
}

function addToWatchedList(movieId: string) {
  const loggedUser = JSON.parse(localStorage.getItem("user") as string);
  axiosInstance.post(`/users/${loggedUser.id}/watched`, { movieId });
}

function removeFromWatchedList(movieId: string) {
  const loggedUser = JSON.parse(localStorage.getItem("user") as string);
  axiosInstance.delete(`/users/${loggedUser.id}/watched/${movieId}`);
}

function likeFilm(movieId: string) {
  const loggedUser = JSON.parse(localStorage.getItem("user") as string);
  axiosInstance.post(`/users/${loggedUser.id}/likes`, { movieId });
}

function removeLike(movieId: string) {
  const loggedUser = JSON.parse(localStorage.getItem("user") as string);
  axiosInstance.delete(`/users/${loggedUser.id}/likes/${movieId}`);
}

function addToWatchList(movieId: string) {
  const loggedUser = JSON.parse(localStorage.getItem("user") as string);
  axiosInstance.post(`/users/${loggedUser.id}/watchlist`, { movieId });
}

function removeFromWatchList(movieId: string) {
  const loggedUser = JSON.parse(localStorage.getItem("user") as string);
  axiosInstance.delete(`/users/${loggedUser.id}/watchlist/${movieId}`);
}
