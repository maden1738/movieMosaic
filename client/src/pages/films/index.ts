import axiosInstance from "../../axios";
import { IFilm } from "../../interface/film";

const sortByIconEl = document.getElementById("sort-open") as HTMLElement;
const sortByModal = document.getElementById("sort-modal") as HTMLElement;
const sortLinks = document.querySelectorAll(
  ".sort-link",
) as NodeListOf<Element>;

const contentEl = document.getElementById("content") as HTMLDivElement;

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
  const response = await axiosInstance.get(
    "/movies/?sortBy=ratingDesc&size=51",
  );

  renderMovies(response.data.data);
});

async function sortData(sortParams: string) {
  try {
    const response = await axiosInstance.get(
      `/movies/?sortBy=${sortParams}&size=51`,
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
