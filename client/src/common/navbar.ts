import { AxiosError } from "axios";
import axiosInstance from "../axios";
import { displayErrors } from "../utils/displayError";
import { IFilm } from "../interface/film";
import { ILogs } from "../interface/log";
import { extractYear } from "../utils/formatter";
import Swal from "sweetalert2";

let debounceTimer: number | null = null;
const DEBOUNCE_DELAY = 300; // milliseconds
let searchResults: IFilm[] = [];

const loginIconEl = document.getElementById("login-icon") as HTMLElement;
const searchIconEl = document.getElementById("search-icon") as HTMLElement;

const loginBody = document.getElementById("login-body") as HTMLElement;
const loginErrorContainer = document.querySelector(
  ".login-error-container",
) as HTMLDivElement;
const searchBody = document.getElementById("search-body") as HTMLElement;
const searchFilmInputEL = document.getElementById(
  "search-movie-input",
) as HTMLInputElement;

const loginForm = document.getElementById("login-form") as HTMLFormElement;

const navbarOpenEl = document.getElementById("navbar-open") as HTMLElement;
const navbarEl = document.getElementById("navbar") as HTMLDivElement;

const userNameEl = document.getElementById("user-name") as HTMLAnchorElement;
const navProfilePicEl = document.getElementById(
  "nav-profile-picture",
) as HTMLImageElement;
const diaryEl = document.getElementById("diary") as HTMLAnchorElement;

const logSearchOpenEl = document.getElementById(
  "log-search-open",
) as HTMLElement;
const searchResultContainer = document.getElementById(
  "search-result-container",
) as HTMLElement;

// log panel
const navLikeIcon = document.getElementById("nav-like-icon") as HTMLElement;
const navRatingEl = document.getElementById("nav-rating") as HTMLSpanElement;
const navLikeCheckbox = document.getElementById(
  "nav-like-checkbox",
) as HTMLInputElement;
const navStarEls = document.querySelectorAll(
  ".nav-star",
) as NodeListOf<HTMLElement>;
const navLogForm = document.getElementById("nav-log-form") as HTMLFormElement;
const navReviewContentEl = document.getElementById(
  "nav-review",
) as HTMLInputElement;
const clearRatingEl = document.getElementById("clear-rating") as HTMLElement;
const filmTitleInput = document.getElementById(
  "film-title",
) as HTMLInputElement;

// nav links
const filmsEl = document.getElementById("films") as HTMLAnchorElement;
const watchlistLink = document.getElementById(
  "watchlist-link",
) as HTMLAnchorElement;
const likesEl = document.getElementById("likes") as HTMLAnchorElement;
const reviewsEl = document.getElementById("reviews") as HTMLAnchorElement;
const logoutEl = document.getElementById("logout") as HTMLAnchorElement;
const profileEl = document.getElementById("profile") as HTMLAnchorElement;

const nonUserElements = document.querySelectorAll(".non-user");
const userElements = document.querySelectorAll(".user");

const logSearchEl = document.getElementById("log-search") as HTMLElement;
const logCloseEl = document.getElementById("log-search-close") as HTMLElement;

window.onload = async () => {
  loginIconEl.addEventListener("click", () => {
    if (!searchBody.classList.contains("hidden")) {
      searchBody.classList.add("hidden");
    }

    if (!navbarEl.classList.contains("hidden")) {
      navbarEl.classList.add("hidden");
    }

    loginBody.classList.toggle("hidden");
  });

  navbarOpenEl.addEventListener("click", () => {
    navbarEl.classList.toggle("hidden");

    if (!loginBody.classList.contains("hidden")) {
      loginBody.classList.add("hidden");
    }
    if (!searchBody.classList.contains("hidden")) {
      searchBody.classList.add("hidden");
    }
  });

  searchIconEl.addEventListener("click", () => {
    if (!loginBody.classList.contains("hidden")) {
      loginBody.classList.add("hidden");
    }
    if (!navbarEl.classList.contains("hidden")) {
      navbarEl.classList.add("hidden");
    }

    searchBody.classList.toggle("hidden");

    searchBody.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchFilmInputEL.value.trim();
      window.location.href = `.././searchResult/?q=${query}`;
    });
  });

  logSearchEl.addEventListener("input", handleSearchInput);

  logSearchOpenEl.addEventListener("click", () => {
    logSearchEl.classList.remove("hidden");
    logSearchEl.classList.add("flex");
  });

  logCloseEl.addEventListener("click", () => {
    logSearchEl.classList.remove("flex");
    logSearchEl.classList.add("hidden");
  });

  navLogForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    const formData: ILogs = {
      filmId: target.dataset.filmId!,
      likeStatus: navLikeCheckbox.checked,
    };

    if (navReviewContentEl.value) {
      formData["content"] = navReviewContentEl.value;
    }

    if (navRatingEl.dataset.rating) {
      formData["rating"] = +navRatingEl.dataset.rating;
    }

    submitLogForm(formData);
  });

  navLikeCheckbox.addEventListener("change", renderLogLikeIcon);

  navStarEls.forEach((el) => {
    el.addEventListener("click", handleStarClick);
  });

  clearRatingEl.addEventListener("click", clearRating);

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

  try {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      throw new Error();
    }
    const response = await axiosInstance.get("/users/me");

    localStorage.setItem("user", JSON.stringify(response.data.data));

    const { id, name, avatarUrl } = response.data.data;

    filmsEl.href = `../userFilms/?id=${id}&content=watched`;
    watchlistLink.href = `../userFilms/?id=${id}&content=watchlist`;
    likesEl.href = `../userFilms/?id=${id}&content=likes`;
    userNameEl.innerHTML = `${name}`;
    userNameEl.href = `.././profile/?id=${id}`;
    navProfilePicEl.src = avatarUrl;
    diaryEl.href = `.././diary/?id=${id}`;
    reviewsEl.href = `.././userReviews/?id=${id}`;
    profileEl.href = `.././profile/?id=${id}`;
    logoutEl.addEventListener("click", logout);

    userElements.forEach((el) => {
      el.classList.remove("hidden");
    });
  } catch (error) {
    localStorage.clear();
    nonUserElements.forEach((el) => {
      el.classList.remove("hidden");
    });
  }
};

function logout() {
  localStorage.clear();
  window.location.href = "/";
}

async function submitLogForm(data: ILogs) {
  try {
    const user = JSON.parse(localStorage.getItem("user") as string);
    await axiosInstance.post(`/users/${user.id}/logs`, data);
    alert("film logged");
  } catch (error) {
    Swal.fire({
      title: "Something went wrong",
      color: "#ccdded",
      background: "#435666",
    });
  }
}

async function searchMovies(query: string) {
  try {
    const response = await axiosInstance.get(
      `/movies?q=${query}&sortBy=popularityDesc`,
    );
    searchResults = response.data.data;
    renderSearchItems();
  } catch (error) {}
}

function handleSearchInput() {
  const query = filmTitleInput.value;

  // Clear any existing debounce timer
  if (debounceTimer !== null) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = window.setTimeout(() => {
    if (query) {
      searchMovies(query);
    } else {
      // Clear results if search query is empty
      searchResults = [];
      renderSearchItems();
    }
  }, DEBOUNCE_DELAY);
}

function renderSearchItems() {
  searchResultContainer.innerHTML = "";
  searchResults.forEach((film) => {
    const releaseDate = extractYear(film.releaseDate);
    const searchItem = document.createElement("li");
    searchItem.dataset.filmId = film.id;
    searchItem.className =
      "block px-[10px] py-[8px] text-xs text-white hover:bg-accent";
    searchItem.innerHTML = `${film.title}  (${releaseDate})`;
    searchItem.addEventListener("click", handleSearchItemClick);
    searchResultContainer.appendChild(searchItem);
  });
}

// rendering log panel
export function handleSearchItemClick(event: MouseEvent) {
  const navLogModal = document.getElementById(
    "nav-log-modal",
  ) as HTMLDivElement;
  const navLogCloseEl = document.getElementById(
    "nav-log-close",
  ) as HTMLDivElement;

  navLogModal.classList.remove("hidden");
  navLogModal.classList.add("flex");

  logSearchEl.classList.remove("flex");
  logSearchEl.classList.add("hidden");

  navLogCloseEl.addEventListener("click", () => {
    navLogModal.classList.remove("flex");
    navLogModal.classList.add("hidden");
  });

  const filmId = (event.target as HTMLElement).dataset.filmId;
  fetchMovie(filmId!);
}

async function fetchMovie(filmId: string) {
  try {
    const response = await axiosInstance.get(`movies/${filmId}`);
    populateLogPanel(response.data.data);
  } catch (error) {
    Swal.fire({
      title: "Something went wrong",
      color: "#ccdded",
      background: "#435666",
    });
  }
}

async function populateLogPanel(film: IFilm) {
  navLogForm.dataset.filmId = film.id;

  const filmPosterEl = document.getElementById(
    "film-poster",
  ) as HTMLImageElement;
  const filmTitleEl = document.getElementById("film-name") as HTMLDivElement;

  const response = await axiosInstance.get(`/me/movie-status/${film.id}`);
  const filmStatus = response.data.data;

  if (filmStatus.likedStatus) {
    navLikeCheckbox.checked = true;
    renderLogLikeIcon();
  }

  if (filmStatus.rating) {
    renderStars(filmStatus.rating);
  }

  filmPosterEl.src = film.posterUrl;
  filmTitleEl.innerHTML = film.title;
}

function renderLogLikeIcon() {
  if (navLikeCheckbox.checked) {
    navLikeIcon.style.color = "#F27405";
  } else {
    navLikeIcon.style.color = "#20262e";
  }
}

function handleStarClick(event: MouseEvent) {
  const rating = (event.target as HTMLFormElement).dataset.rating;

  // value of rating that will be sent with formdata
  navRatingEl.dataset.rating = rating;
  renderStars(rating!);
}

function renderStars(rating: string) {
  navStarEls.forEach((el, index) => {
    if (index > +rating - 1) {
      el.dataset.filled = "false";
      el.style.color = "#324654";
    } else {
      el.dataset.filled = "true";
      el.style.color = "#05ab1e";
    }
  });
}

function clearRating() {
  navRatingEl.dataset.rating = "";

  navStarEls.forEach((el) => {
    el.style.color = "#324654";
  });
}
