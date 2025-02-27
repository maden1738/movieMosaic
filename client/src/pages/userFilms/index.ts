import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import { IFilm, IPagination } from "../../interface/film";

const contentEl = document.getElementById("content") as HTMLDivElement;
const listTitleEl = document.getElementById("list-title") as HTMLDivElement;

const userNameElements = document.querySelectorAll(
  ".username",
) as NodeListOf<HTMLAnchorElement>;
const titleProfilePicEl = document.getElementById(
  "title-profile-pic",
) as HTMLImageElement;

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

    // closing sortBy modal
    sortByModal.classList.toggle("hidden");

    fetchMovies(1, sortParams);
  });
});

let params = new URL(document.location.toString()).searchParams;
const id = params.get("id");
const contentType = params.get("content");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    const { name, avatarUrl } = response.data.data;

    userNameElements.forEach((el) => {
      el.innerHTML = name;
      el.href = `.././profile/?id=${id}`;
    });

    titleProfilePicEl.src = avatarUrl;
  } catch (error) {
    Swal.fire({
      title: "Something went wrong",
      color: "#ccdded",
      background: "#435666",
    });
  }

  renderTitle();
  fetchMovies();
});

function renderTitle() {
  switch (contentType) {
    case "watchlist":
      listTitleEl.innerHTML = "Watchlist";
      break;
    case "likes":
      listTitleEl.innerHTML = "Likes";
      break;
    case "watched":
      listTitleEl.innerHTML = "Watched";
      break;
  }
}

async function fetchMovies(
  page: number = 1,
  sortParams: string = "releaseDateDesc",
) {
  try {
    const response = await axiosInstance.get(
      `/users/${id}/${contentType}?page=${page}&sortBy=${sortParams}&size=28`,
    );

    renderMovies(response.data.data);

    const pagination = {
      page: response.data.meta.page,
      totalPages: response.data.meta.totalPages,
    };
    renderPagination(pagination);
  } catch (error) {}
}

function renderMovies(data: Array<IFilm>) {
  contentEl.innerHTML = "";
  data.forEach((film) => {
    const link = document.createElement("a");
    link.href = `../singleFilm/?id=${parseInt(film.id)}`;
    const filmContainer = document.createElement("div");
    filmContainer.className =
      "overflow-hidden rounded-md  hover:outline outline-[4px] outline-offset-[-3px] outline-accent transition-all duration-200 ease-in";
    const poster = document.createElement("img");
    poster.src = film.posterUrl;
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
