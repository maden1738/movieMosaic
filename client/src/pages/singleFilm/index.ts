import { IFilm } from "../../interface/film";
import { convertRating, extractYear } from "../../utils/formatter";
import axiosInstance from "../../axios";
import { IReview } from "../../interface/review";

const movieDetailsEl = document.getElementById(
  "movie-details",
) as HTMLDivElement;

let isUserLoggedIn = false;

let params = new URL(document.location.toString()).searchParams;
const id = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  // checking if user is logged in
  try {
    const response = await axiosInstance.get("/users/me");
    localStorage.setItem("user", JSON.stringify(response.data.data));
    isUserLoggedIn = true;
  } catch (error) {
    console.log(error);
  }

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
        console.log(error);
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
        console.log(error);
      }
    });

    watchlistEl.addEventListener("click", () => {
      console.log("clicked");

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
        console.log(error);
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
    console.log("here");
  }

  fetchRecentReviews();
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
  } = data;

  releaseDate = extractYear(releaseDate);
  rating = convertRating(rating);

  movieDetailsEl.innerHTML = `<section class = "relative">
      <img src="https://image.tmdb.org/t/p/w500${backdropUrl}" alt="backdrop photo" class="shadow-lg w-full"  />
       <button
        class="absolute right-4 top-5  flex aspect-square w-[24px] items-center justify-center gap-[2px] rounded-full bg-white"
        id="userpanel-open"
      >
        <span class="aspect-square w-1 rounded-full bg-subText"></span>
        <span class="aspect-square w-1 rounded-full bg-subText"></span>
        <span class="aspect-square w-1 rounded-full bg-subText"></span>
      </button>
       <!-- userpanel -->
      <div
        class="fixed inset-0 z-10 hidden items-center justify-center bg-black bg-opacity-55"
        id="userpanel"
      >
        <section class="wrapper relative text-text">
          <button
            id="userpanel-close"
            class="absolute right-0 top-0 flex aspect-square w-[22px] translate-x-[-50%] translate-y-[-50%] cursor-pointer items-center justify-center rounded-full bg-orange shadow-lg"
          >
            <i class="fa-regular fa-x text-sm font-semibold"></i>
          </button>
          <div class="w-full bg-primaryDark">
            <div class="grid grid-cols-3 py-4">
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
            <div class="h-[1px] bg-[#324654]"></div>
            <div class="flex flex-col items-center py-4">
              <div class="text-center text-sm">Rate</div>
              <div>
                <i class="fa-solid fa-star text-sm text-[#324654]"></i>
                <i class="fa-solid fa-star text-sm text-[#324654]"></i>
                <i class="fa-solid fa-star text-sm text-[#324654]"></i>
                <i class="fa-solid fa-star text-sm text-[#324654]"></i>
                <i class="fa-solid fa-star text-sm text-[#324654]"></i>
              </div>
            </div>
            <div class="h-[1px] bg-[#324654]"></div>
            <div class="flex cursor-pointer flex-col items-center py-4 text-sm">
              Review or log
            </div>
          </div>
        </section>
      </div>
    </section>
    <section class="wrapper flex justify-between">
      <div class="pt-4">
        <div id="title" class="text-xl font-medium text-white max-w-[200px]">${title}</div>

        <div class="mt-4 text-sm text-subText">DIRECTED BY</div>
        <div class="font-bold text-text">Swarna Jang Maden</div>

        <div class="mt-6 flex items-center gap-4">
          <a id="trailer" href="https://www.youtube.com/watch?v=mAKsZ26SabQ">
            <button
              class="rounded-lg bg-primary px-2 py-[2px] text-sm text-text"
            >
              Trailer
            </button>
          </a>

          <div class="text-sm text-text" id="date">${releaseDate}</div>
        </div>
      </div>
      <div class="pt-2 w-[110px]  overflow-hidden rounded-lg">
        <img src="https://image.tmdb.org/t/p/w500${posterUrl}" alt="poster" class = "w-full" />
      </div>
    </section>

    <p class="wrapper mt-6 text-subText" id="overview">
     ${overview}
    </p>

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
    console.log(error);
  }
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
    const divEl = document.createElement("div");
    divEl.innerHTML = `<section class="py-4">
          <div class="flex items-center gap-1 text-sm text-subText">
            <div class="aspect-square w-[18px] overflow-hidden rounded-full">
              <img
                src="/vite.svg"
                alt="profile picture"
                id="profile-picture
                class="h-full "
              />
            </div>
            <span class="pl-1">Review By </span>
            <span id="username" class="font-semibold capitalize text-subText"
              >${review.name}</span
            >
            <span class="pl-1 font-bold text-accent" id="rating">${review.rating}</span>
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
