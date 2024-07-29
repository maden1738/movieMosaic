import { SignupSchema } from "./schema/user";
import { validateForm } from "./utils/validator";
import axios, { AxiosError } from "axios";
import { ISignupData } from "./interface/user";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { IFilm } from "./interface/film";
import axiosInstance from "./axios";
import { displayErrors } from "./utils/displayError";

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
const popularMoviesContainer = document.querySelector(
  ".popular-movies",
) as HTMLDivElement;
const nonUserElements = document.querySelectorAll(".non-user");
const userElements = document.querySelectorAll(".user");
const introUserEl = document.getElementById("intro-name") as HTMLAnchorElement;

const navbarOpenEl = document.getElementById("navbar-open") as HTMLElement;
const navbarEl = document.getElementById("navbar") as HTMLDivElement;

// nav links
const watchlistLink = document.getElementById(
  "watchlist-link",
) as HTMLAnchorElement;
const filmsEl = document.getElementById("films") as HTMLAnchorElement;
const likesEl = document.getElementById("likes") as HTMLAnchorElement;

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
});

window.onload = async () => {
  try {
    const response = await axiosInstance.get("/users/me");
    localStorage.setItem("user", JSON.stringify(response.data.data));

    filmsEl.href = `./src/pages/userFilms/?id=${response.data.data.id}&content=watched`;
    watchlistLink.href = `./src/pages/userFilms/?id=${response.data.data.id}&content=watchlist`;
    likesEl.href = `./src/pages/userFilms/?id=${response.data.data.id}&content=likes`;

    userElements.forEach((el) => {
      el.classList.remove("hidden");
    });

    introUserEl.innerHTML = response.data.data.name;
    introUserEl.href = `./src/pages/profile/?id=${response.data.data.id}`;
  } catch (error) {
    nonUserElements.forEach((el) => {
      el.classList.remove("hidden");
    });
  }
};

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
    location.reload();
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      displayErrors(error.response.data.message, loginErrorContainer);
    }
  }
});

async function submitSignupForm(formData: ISignupData) {
  try {
    await axiosInstance.post("/auth/signup", formData);
    Toastify({
      text: "User signed up",
      duration: 5000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "black",
        color: "white",
      },
    }).showToast();

    signupModalEl.classList.toggle("hidden");
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      displayErrors(error.response.data.message, signupErrorContainer);
    }
  }
}

axios.get("http://localhost:3000/movies?sortBy=popularityDesc").then((res) => {
  renderPopularMovies(res.data.data);
});

function renderPopularMovies(data: Array<IFilm>) {
  data.forEach((film) => {
    const link = document.createElement("a");
    link.href = `./src/pages/singleFilm/?id=${parseInt(film.id)}`;
    const filmContainer = document.createElement("div");
    const poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w500${film.posterUrl}`;
    filmContainer.appendChild(poster);
    link.appendChild(filmContainer);
    popularMoviesContainer.appendChild(link);
  });
}
