import axiosInstance from "../../axios";
import { IFilm, IPagination } from "../../interface/film";

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

    // fetching sorted films starting from page 1
    fetchMovies(1, sortParams);

    // closing sortBy modal
    sortByModal.classList.toggle("hidden");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetchMovies();
});

async function fetchMovies(
  page: number = 1,
  sortParams: string = "ratingDesc",
) {
  try {
    const response = await axiosInstance.get(
      `/movies/?sortBy=${sortParams}&size=27&page=${page}`,
    );

    renderMovies(response.data.data);

    const pagination = {
      page: response.data.meta.page,
      totalPages: response.data.meta.totalPages,
    };

    renderPagination(pagination);
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

function renderPagination(pagination: IPagination) {
  const paginationEl = document.getElementById("pagination") as HTMLDivElement;

  paginationEl.innerHTML = "";

  for (let i = 1; i <= pagination.totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i.toString();
    pageButton.className =
      "mx-1 aspect-square px-2 py-1 disabled:opacity-50 hover:bg-[#667788]";
    pageButton.addEventListener("click", () => changePage(i));
    if (i === pagination.page) {
      pageButton.disabled = true;
    }
    paginationEl.appendChild(pageButton);
  }
}

async function changePage(page: number) {
  await fetchMovies(page);
}
