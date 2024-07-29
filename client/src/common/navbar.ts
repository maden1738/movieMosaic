import { AxiosError } from "axios";
import axiosInstance from "../axios";
import { displayErrors } from "../utils/displayError";

const loginIconEl = document.getElementById("login-icon") as HTMLElement;
const searchIconEl = document.getElementById("search-icon") as HTMLElement;

const loginBody = document.getElementById("login-body") as HTMLElement;
const loginErrorContainer = document.querySelector(
  ".login-error-container",
) as HTMLDivElement;
const searchBody = document.getElementById("search-body") as HTMLElement;

const loginForm = document.getElementById("login-form") as HTMLFormElement;

const navbarOpenEl = document.getElementById("navbar-open") as HTMLElement;
const navbarEl = document.getElementById("navbar") as HTMLDivElement;

const userNameEl = document.getElementById("user-name") as HTMLDivElement;

// nav links
const filmsEl = document.getElementById("films") as HTMLAnchorElement;
const watchlistLink = document.getElementById(
  "watchlist-link",
) as HTMLAnchorElement;
const likesEl = document.getElementById("likes") as HTMLAnchorElement;

const nonUserElements = document.querySelectorAll(".non-user");
const userElements = document.querySelectorAll(".user");

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

    filmsEl.href = `../userFilms/?id=${response.data.data.id}&content=watched`;
    watchlistLink.href = `../userFilms/?id=${response.data.data.id}&content=watchlist`;
    likesEl.href = `../userFilms/?id=${response.data.data.id}&content=likes`;
    userNameEl.innerHTML = `${response.data.data.name}`;

    userElements.forEach((el) => {
      el.classList.remove("hidden");
    });
  } catch (error) {
    localStorage.removeItem("user");
    nonUserElements.forEach((el) => {
      el.classList.remove("hidden");
    });
  }
};

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
