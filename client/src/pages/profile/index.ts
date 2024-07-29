import axiosInstance from "../../axios";
import { IFilm } from "../../interface/film";

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
// const followersLink = document.getElementById(
//   "followers-link",
// ) as HTMLAnchorElement;
// const followingLink = document.getElementById("following-link");

document.addEventListener("DOMContentLoaded", () => {
  filmsLink.href = `../userFilms/?id=${id}&content=watched`;

  displayUserName();
  fetchRecentActivity();
  fetchNoOfFollowers();
  fetchNoOfFollowing();
});

let params = new URL(document.location.toString()).searchParams;
const id = params.get("id");
console.log(id);
watchedLink.href = `../userFilms/?id=${id}&content=watched`;

function displayUserName() {
  const user = JSON.parse(localStorage.getItem("user") as string);
  if (user) {
    profileUserNameEl.innerHTML = user.name;
  }
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
