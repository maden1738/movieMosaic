import axiosInstance from "../../axios";
import { AxiosError } from "axios";
import { displayErrors } from "../../utils/displayError";

import { IFilm } from "../../interface/film";
import { convertRating, extractYear } from "../../utils/formatter";

const loginIconEl = document.getElementById("login-icon") as HTMLElement;
const searchIconEl = document.getElementById("search-icon") as HTMLElement;

const loginBody = document.getElementById("login-body") as HTMLElement;
const loginErrorContainer = document.querySelector(
  ".login-error-container",
) as HTMLDivElement;
const searchBody = document.getElementById("search-body") as HTMLElement;

const loginForm = document.getElementById("login-form") as HTMLFormElement;

const movieDetailsEl = document.getElementById(
  "movie-details",
) as HTMLDivElement;

loginIconEl.addEventListener("click", () => {
  if (!searchBody.classList.contains("hidden")) {
    searchBody.classList.add("hidden");
  }

  loginBody.classList.toggle("hidden");
});

searchIconEl.addEventListener("click", () => {
  if (!loginBody.classList.contains("hidden")) {
    loginBody.classList.add("hidden");
  }

  searchBody.classList.toggle("hidden");
});

const nonUserElements = document.querySelectorAll(".non-user");
const userElements = document.querySelectorAll(".user");

window.onload = async () => {
  try {
    await axiosInstance.get("/users/me");

    nonUserElements.forEach((el) => {
      el.classList.toggle("hidden");
    });
  } catch (error) {
    userElements.forEach((el) => {
      el.classList.toggle("hidden");
    });
  }

  try {
    let params = new URL(document.location.toString()).searchParams;
    const id = params.get("id");

    const response = await axiosInstance.get(`/movies/${id}`);

    renderMovieDetails(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

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

  movieDetailsEl.innerHTML = `<section>
      <img src="https://image.tmdb.org/t/p/w500${backdropUrl}" alt="backdrop photo" class="shadow-lg" />
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

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const target = event.target as HTMLFormElement;

  const formData = {
    email: target.loginEmail.value,
    password: target.loginPassword.value,
  };

  try {
    const response = await axiosInstance.post("/auth/login", formData);
    localStorage.setItem("token", response.data.data.accessToken);
    loginBody.classList.toggle("hidden");
    location.reload();
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      displayErrors(error.response.data.message, loginErrorContainer);
    }
  }
});
