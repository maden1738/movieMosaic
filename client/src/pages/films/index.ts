import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { displayErrors } from "../../utils/displayError";
import { IFilm } from "../../interface/film";

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

const contentEl = document.getElementById("content") as HTMLDivElement;
const listTitleEl = document.getElementById("list-title") as HTMLDivElement;

const userNameElements = document.querySelectorAll(".username");

// nav links
const watchlistLink = document.getElementById(
  "watchlist-link",
) as HTMLAnchorElement;
const filmsEl = document.getElementById("films") as HTMLAnchorElement;
const likesEl = document.getElementById("likes") as HTMLAnchorElement;

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

const nonUserElements = document.querySelectorAll(".non-user");
const userElements = document.querySelectorAll(".user");

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

window.onload = async () => {
  try {
    const response = await axiosInstance.get("/users/me");
    localStorage.setItem("user", JSON.stringify(response.data.data));

    filmsEl.href = `./?id=${response.data.data.id}&content=watched`;
    watchlistLink.href = `./?id=${response.data.data.id}&content=watchlist`;
    likesEl.href = `./?id=${response.data.data.id}&content=likes`;

    userElements.forEach((el) => {
      el.classList.remove("hidden");
    });
  } catch (error) {
    nonUserElements.forEach((el) => {
      el.classList.remove("hidden");
    });
  }

  let params = new URL(document.location.toString()).searchParams;
  const id = params.get("id");
  const contentType = params.get("content");

  try {
    const response = await axiosInstance.get(`/users/${id}`);
    const { name } = response.data.data;

    userNameElements.forEach((el) => {
      el.innerHTML = name;
    });
  } catch (error) {
    console.log(error);
  }

  try {
    let response;
    switch (contentType) {
      case "watchlist":
        listTitleEl.innerHTML = "Watchlist";
        response = await axiosInstance.get(`/users/${id}/watchlist`);
        break;
      case "likes":
        listTitleEl.innerHTML = "Likes";
        response = await axiosInstance.get(`/users/${id}/likes`);
        break;
      default:
        listTitleEl.innerHTML = "Watched";
        response = await axiosInstance.get(`/users/${id}/watched`);
    }

    renderMovies(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

function renderMovies(data: Array<IFilm>) {
  data.forEach((film) => {
    const link = document.createElement("a");
    link.href = `../singleFilm/?id=${parseInt(film.id)}`;
    const filmContainer = document.createElement("div");
    const poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w500${film.posterUrl}`;
    poster.alt = "film poster";
    filmContainer.appendChild(poster);
    link.appendChild(filmContainer);

    contentEl.appendChild(link);
  });
}
