import axiosInstance from "../../axios";
import { IFilm } from "../../interface/film";
import { extractYear } from "../../utils/formatter";

let params = new URL(document.location.toString()).searchParams;
const query = params.get("q");

const searchResultEl = document.getElementById("search-result") as HTMLElement;

document.addEventListener("DOMContentLoaded", () => {
  fetchResult();
});

async function fetchResult() {
  try {
    const response = await axiosInstance.get(`/movies/?q=${query}&size=6`);

    renderResult(response.data.data);
  } catch (error) {
    console.log(error);
  }
}

function renderResult(films: Array<IFilm>) {
  films.forEach((film) => {
    const divEl = document.createElement("div");
    const releaseDate = extractYear(film.releaseDate);
    divEl.innerHTML = `<div class="py-4">
        <div class="grid grid-cols-layout2 gap-4">
          <div class="h-[105px] w-[70px] overflow-hidden rounded-md">
            <a href=".././singleFilm/?id=${film.id}">
               <img src="https://image.tmdb.org/t/p/w500${film.posterUrl}" alt="film poster" class="h-full w-full" />
            </a>
          </div>
          <div class="pt-4">
            <a href=".././singleFilm/?id=${film.id}" class="mr-2 inline text-xl font-semibold text-white hover:text-accent2">
              ${film.title}
            </a>
            <span class="text-subText">${releaseDate}</span>
          </div>
        </div>
      </div>
      <div class="h-[1px] bg-primary"></div>`;

    searchResultEl.appendChild(divEl);
  });
}
