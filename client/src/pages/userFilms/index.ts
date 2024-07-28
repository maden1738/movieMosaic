import { AxiosResponse } from "axios";
import axiosInstance from "../../axios";
import { IFilm } from "../../interface/film";

const contentEl = document.getElementById("content") as HTMLDivElement;
const listTitleEl = document.getElementById("list-title") as HTMLDivElement;

const userNameElements = document.querySelectorAll(".username");

// sort by modal
const sortByIconEl = document.getElementById("sort-open") as HTMLElement;
const sortByModal = document.getElementById("sort-modal") as HTMLElement;
const sortLinks = document.querySelectorAll(
  ".sort-link",
) as NodeListOf<Element>;

// open and close sort by modal
sortByIconEl.addEventListener("click", () => {
  sortByModal.classList.toggle("hidden");
});

// handle sort by params
sortLinks.forEach((el) => {
  el.addEventListener("click", (event) => {
    const sortParams = (event.target as HTMLElement).dataset.params!;
    sortData(sortParams);

    // closing sortBy modal
    sortByModal.classList.toggle("hidden");
  });
});

document.addEventListener("DOMContentLoaded", async () => {
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
    let response: AxiosResponse;
    switch (contentType) {
      case "watchlist":
        listTitleEl.innerHTML = "Watchlist";
        response = await axiosInstance.get(`/users/${id}/watchlist`);
        renderMovies(response.data.data);
        break;
      case "likes":
        listTitleEl.innerHTML = "Likes";
        response = await axiosInstance.get(`/users/${id}/likes`);
        renderMovies(response.data.data);
        break;
      case "watched":
        listTitleEl.innerHTML = "Watched";
        response = await axiosInstance.get(`/users/${id}/watched`);
        renderMovies(response.data.data);
        break;
    }
  } catch (error) {
    console.log(error);
  }
});

async function sortData(sortParams: string) {
  let params = new URL(document.location.toString()).searchParams;
  const id = params.get("id");
  const contentType = params.get("content");

  try {
    const response = await axiosInstance.get(
      `/users/${id}/${contentType}?sortBy=${sortParams}`,
    );
    renderMovies(response.data.data);
  } catch (error) {
    console.log(error);
  }
}

function renderMovies(data: Array<IFilm>) {
  contentEl.innerHTML = "";
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
