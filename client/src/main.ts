import { SignupSchema } from "./schema/user";
import { validateForm } from "./utils/validator";
import { AxiosError } from "axios";
import { ISignupData } from "./interface/user";
import Swal from "sweetalert2";
import { IFilm } from "./interface/film";
import axiosInstance from "./axios";
import { displayErrors } from "./utils/displayError";
import { convertIntoStar, extractYear } from "./utils/formatter";
import { ILogs, ILogsResponse } from "./interface/log";
import { CreateMoviesBodySchema } from "./schema/film";

let debounceTimer: number | null = null;
const DEBOUNCE_DELAY = 300; // milliseconds
let searchResults: IFilm[] = [];

const signupForm = document.getElementById("sign-up") as HTMLFormElement;
const loginForm = document.getElementById("login-form") as HTMLFormElement;
const getStartedEl = document.getElementById(
  "get-started-btn",
) as HTMLButtonElement;

const signupModalEl = document.getElementById("signup-modal") as HTMLDivElement;
const exitSignupModal = document.getElementById(
  "exit-signup-modal",
) as HTMLElement;
const loginIconEl = document.getElementById("login-icon") as HTMLElement;
const searchIconEl = document.getElementById("search-icon") as HTMLElement;
const signupErrorContainer = document.querySelector(
  ".signup-error-container",
) as HTMLDivElement;
const loginErrorContainer = document.querySelector(
  ".login-error-container",
) as HTMLDivElement;
const loginBody = document.getElementById("login-body") as HTMLElement;
const searchBody = document.getElementById("search-body") as HTMLElement;
const searchFilmInputEL = document.getElementById(
  "search-movie-input",
) as HTMLInputElement;
const popularMoviesContainer = document.querySelector(
  ".popular-movies",
) as HTMLDivElement;
const nonUserElements = document.querySelectorAll(".non-user");
const userElements = document.querySelectorAll(".user");
const introUserEl = document.getElementById("intro-name") as HTMLAnchorElement;

const newFromFriendSection = document.getElementById(
  "new-from-friend-section",
) as HTMLElement;

const navbarOpenEl = document.getElementById("navbar-open") as HTMLElement;
const navbarEl = document.getElementById("navbar") as HTMLDivElement;

// nav links
const watchlistLink = document.getElementById(
  "watchlist-link",
) as HTMLAnchorElement;
const filmsEl = document.getElementById("films") as HTMLAnchorElement;
const likesEl = document.getElementById("likes") as HTMLAnchorElement;
const diaryEl = document.getElementById("diary") as HTMLAnchorElement;
const reviewsEl = document.getElementById("reviews") as HTMLAnchorElement;
const profileEl = document.getElementById("profile") as HTMLAnchorElement;
const logoutEl = document.getElementById("logout") as HTMLAnchorElement;

const userNameEl = document.getElementById("user-name") as HTMLAnchorElement;
const navProfilePicEl = document.getElementById(
  "nav-profile-picture",
) as HTMLImageElement;

// log search modal
const logSearchOpenEl = document.getElementById(
  "log-search-open",
) as HTMLElement;
const searchResultContainer = document.getElementById(
  "search-result-container",
) as HTMLElement;

// log panel
const navLikeIcon = document.getElementById("nav-like-icon") as HTMLElement;
const navRatingEl = document.getElementById("nav-rating") as HTMLSpanElement;
const clearRatingEl = document.getElementById("clear-rating") as HTMLElement;
const navLikeCheckbox = document.getElementById(
  "nav-like-checkbox",
) as HTMLInputElement;
const navStarEls = document.querySelectorAll(
  ".nav-star",
) as NodeListOf<HTMLElement>;
const navLogForm = document.getElementById("nav-log-form") as HTMLFormElement;
const navReviewContentEl = document.getElementById(
  "nav-review",
) as HTMLTextAreaElement;

const logSearchEl = document.getElementById("log-search") as HTMLElement;
const logCloseEl = document.getElementById("log-search-close") as HTMLElement;

const addFilmSection = document.getElementById(
  "add-film-section",
) as HTMLElement;
const addFilmForm = document.getElementById("add-film-form") as HTMLFormElement;
const newFilmNameEl = document.getElementById(
  "new-film-name",
) as HTMLInputElement;
const newFilmDateEl = document.getElementById(
  "new-film-date",
) as HTMLInputElement;
const newFilmTrailerEl = document.getElementById(
  "new-film-trailer",
) as HTMLInputElement;
const newPosterEl = document.getElementById(
  "new-film-poster",
) as HTMLInputElement;
const newBackdropEL = document.getElementById(
  "new-backdrop-poster",
) as HTMLInputElement;
const newFilmOverviewEl = document.getElementById(
  "new-film-overview",
) as HTMLTextAreaElement;
const newErrorContainer = document.getElementById(
  "new-error-container",
) as HTMLDivElement;
const newFilmBtn = document.getElementById("new-film-btn") as HTMLButtonElement;
const btnSpinner = document.getElementById("btn-spinner") as HTMLElement;

const filmTitleInput = document.getElementById(
  "film-title",
) as HTMLInputElement;

logSearchEl.addEventListener("input", handleSearchInput);

logSearchOpenEl.addEventListener("click", () => {
  logSearchEl.classList.remove("hidden");
  logSearchEl.classList.add("flex");
});

logCloseEl.addEventListener("click", () => {
  logSearchEl.classList.remove("flex");
  logSearchEl.classList.add("hidden");
});

getStartedEl.addEventListener("click", () => {
  signupModalEl.classList.toggle("hidden");
});

exitSignupModal.addEventListener("click", () => {
  signupModalEl.classList.toggle("hidden");
});

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
    window.location.href = `./src/pages/searchResult/?q=${query}`;
  });
});

window.onload = async () => {
  try {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      throw new Error();
    }

    // checking the validaity of access token
    const response = await axiosInstance.get("/users/me");
    localStorage.setItem("user", JSON.stringify(response.data.data));

    const { id, name, avatarUrl, role } = response.data.data;

    if (role === "admin") {
      addFilmSection.classList.remove("hidden");
    }

    filmsEl.href = `./src/pages/userFilms/?id=${id}&content=watched`;
    watchlistLink.href = `./src/pages/userFilms/?id=${id}&content=watchlist`;
    likesEl.href = `./src/pages/userFilms/?id=${id}&content=likes`;
    diaryEl.href = `./src/pages/diary/?id=${id}`;
    reviewsEl.href = `./src/pages/userReviews/?id=${id}`;
    profileEl.href = `./src/pages/profile/?id=${id}`;
    logoutEl.addEventListener("click", logout);

    userNameEl.innerHTML = name;
    userNameEl.href = `./src/pages/profile/?id=${id}`;
    navProfilePicEl.src = avatarUrl;

    userElements.forEach((el) => {
      el.classList.remove("hidden");
    });

    introUserEl.innerHTML = response.data.data.name;
    introUserEl.href = `./src/pages/profile/?id=${response.data.data.id}`;

    fetchLogsOfFriends(id);
  } catch (error) {
    localStorage.clear();
    nonUserElements.forEach((el) => {
      el.classList.remove("hidden");
    });
  }

  fetchPopularMovies();
};

async function fetchPopularMovies() {
  try {
    const response = await axiosInstance.get(
      "/movies?sortBy=popularityDesc&size=12",
    );
    renderPopularMovies(response.data.data);
  } catch (error) {
    Swal.fire({
      title: "Something went wrong",
      color: "#ccdded",
      background: "#435666",
    });
  }
}

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const target = event.target as HTMLFormElement;

  const formData = {
    email: target.email.value,
    name: target.username.value,
    password: target.password.value,
  };

  const errors = validateForm(formData, SignupSchema);

  if (errors) {
    displayErrors(errors[0].message, signupErrorContainer);
  } else {
    await submitSignupForm(formData);
  }
});

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
    window.location.reload();
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      displayErrors(error.response.data.message, loginErrorContainer);
    }
  }
});

addFilmForm.addEventListener("submit", handleAddFilmSubmit);

navLikeCheckbox.addEventListener("change", () => {
  renderLogLikeIcon();
});

navStarEls.forEach((el) => {
  el.addEventListener("click", handleStarClick);
});

clearRatingEl.addEventListener("click", clearRating);

navLogForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const target = event.target as HTMLFormElement;

  const formData: ILogs = {
    filmId: target.dataset.filmId!,
    likeStatus: navLikeCheckbox.checked,
    // content: navReviewContentEl.value.trim() || undefined,
  };

  if (navReviewContentEl.value) {
    formData["content"] = navReviewContentEl.value;
  }

  if (navRatingEl.dataset.rating) {
    formData["rating"] = +navRatingEl.dataset.rating;
  }

  submitLogForm(formData);
});

async function submitSignupForm(formData: ISignupData) {
  try {
    await axiosInstance.post("/auth/signup", formData);
    Swal.fire({
      title: "User signed up successfully",
      color: "#ccdded",
      background: "#435666",
    });

    signupModalEl.classList.toggle("hidden");
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      displayErrors(error.response.data.message, signupErrorContainer);
    }
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "/";
}

function handleAddFilmSubmit(event: SubmitEvent) {
  event.preventDefault();

  const formData = new FormData();

  const poster = newPosterEl.files![0];
  const backdrop = newBackdropEL.files![0];
  formData.append("poster", poster);
  formData.append("backdrop", backdrop);
  formData.append("title", newFilmNameEl.value.trim());
  formData.append("overview", newFilmOverviewEl.value);
  formData.append("trailer", newFilmTrailerEl.value.trim());
  formData.append("releaseDate", newFilmDateEl.value);

  // Convert FormData to a plain object
  const formObject: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  const errors = validateForm(formObject, CreateMoviesBodySchema);

  if (errors) {
    displayErrors(errors[0].message, newErrorContainer);
    return;
  }

  submitAddFilmForm(formData);
}

async function submitAddFilmForm(formData: FormData) {
  try {
    newFilmBtn.disabled = true;
    btnSpinner.classList.toggle("hidden");
    await axiosInstance.post("movies", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    location.reload();
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      displayErrors(error.response.data.message, newErrorContainer);
    }

    newFilmBtn.disabled = false;
    btnSpinner.classList.toggle("hidden");
  }
}

async function submitLogForm(data: ILogs) {
  try {
    const user = JSON.parse(localStorage.getItem("user") as string);
    await axiosInstance.post(`/users/${user.id}/logs`, data);
    alert("film added to logs");
    location.reload();
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
  const query = filmTitleInput.value.trim();

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

async function fetchLogsOfFriends(userId: string) {
  try {
    const response = await axiosInstance.get(`users/${userId}/follow/logs`);

    if (response.data.data.length === 0) {
      newFromFriendSection.classList.add("hidden");
      return;
    }
    renderLogsOfFriends(response.data.data);
  } catch (error) {
    Swal.fire({
      title: "Something went wrong",
      color: "#ccdded",
      background: "#435666",
    });
  }
}

function renderLogsOfFriends(logsArr: Array<ILogsResponse>) {
  const logsOfFriendEl = document.getElementById(
    "new-from-friend",
  ) as HTMLDivElement;

  logsArr.forEach((log) => {
    const divEl = document.createElement("div");
    const ratingStars = convertIntoStar(log.rating!);
    divEl.innerHTML = `
      <div class="rounded-t-md overflow-hidden">
          <a href="./src/pages/singleFilm/?id=${log.filmId}" class="h-full">
            <img src="${log.posterUrl}" alt="film poster" class="h-full w-full" />
          </a>

          <div class="flex items-center rounded-b-md bg-primaryDark p-1 ">
            <div
              class="mr-1 aspect-square w-[13px] overflow-hidden rounded-full"
            >
              <img
                src="${log.avatarUrl}"
                alt="profile picture"
                class="h-full w-full object-cover"
              />
            </div>
            <a href="./src/pages/profile/?id=${log.userId}" class="text-xs font-bold text-backgroundLight hover:text-white"
              >${log.name}</a
            >
          </div>
          <div class="">
            <span class="text-[10px] text-subText">
              ${ratingStars}
            </span>
            <span class="${log.likeStatus ? "px-[1px] text-[10px]" : "hidden"}">
              <i class="fa-solid fa-heart text-xs text-subText "></i>
            </span>
            <a class="${log.content ? "px-[1px] text-[10px]" : "hidden"}" href="./src/pages/singleReview/?id=${log.reviewId}">
              <i class="fa-solid fa-ticket-simple text-xs text-subText hover:text-white  "></i>
            </a>
          </div>
        </div>`;
    logsOfFriendEl.appendChild(divEl);
  });
}

function renderPopularMovies(data: Array<IFilm>) {
  data.forEach((film) => {
    const link = document.createElement("a");
    link.href = `./src/pages/singleFilm/?id=${parseInt(film.id)}`;
    const filmContainer = document.createElement("div");
    filmContainer.className =
      "overflow-hidden rounded-md  hover:outline outline-[4px] outline-offset-[-3px] outline-accent transition-all duration-200 ease-in";
    const poster = document.createElement("img");
    poster.src = `${film.posterUrl}`;
    filmContainer.appendChild(poster);
    link.appendChild(filmContainer);
    popularMoviesContainer.appendChild(link);
  });
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
function handleSearchItemClick(event: MouseEvent) {
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
