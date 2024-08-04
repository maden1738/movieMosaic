import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import { ILogsResponse } from "../../interface/log";
import { convertIntoStar, extractDayAndMonth } from "../../utils/formatter";
import { IPagination } from "../../interface/film";

const contentEl = document.getElementById("content") as HTMLElement;
const avatar = document.getElementById("avatar") as HTMLImageElement;
const userNameEl = document.getElementById("name") as HTMLAnchorElement;

let params = new URL(document.location.toString()).searchParams;
const id = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);

    const { avatarUrl, name } = response.data.data;

    avatar.src = avatarUrl;
    userNameEl.innerHTML = name;
    userNameEl.href = `.././profile/?id=${id}`;
  } catch (error) {
    Swal.fire({
      title: "something went wrong",
      color: "#ccdded",
      background: "#435666",
    });
  }
  fetchDiary();
});

async function fetchDiary(page: number = 1) {
  try {
    const response = await axiosInstance.get(
      `users/${id}/logs?page=${page}&size=3`,
    );
    renderDiary(response.data.data);

    const pagination = {
      page: response.data.meta.page,
      totalPages: response.data.meta.totalPages,
    };

    renderPagination(pagination);
  } catch (error) {}
}

function renderDiary(logs: Array<ILogsResponse>) {
  contentEl.innerHTML = "";
  logs.forEach((log) => {
    const divEl = document.createElement("div");
    let ratingStars = "";
    if (log.rating) {
      ratingStars = convertIntoStar(log.rating);
    }

    const logDate = extractDayAndMonth(log.createdAt);

    divEl.innerHTML = `<div class="flex w-full gap-4 py-3">
        <div class="text-base text-primary min-w-fit">${logDate}</div>

        <div class="h-[52px] min-w-[35px] overflow-hidden">
          <img src="${log.posterUrl}" alt="film poster" class="h-full w-full" />
        </div>
        <div class="flex flex-grow justify-between">
          <div>
            <a href=".././singleFilm/?id=${log.filmId}" class="block font-semibold text-white hover:text-accent2"  id="film-title">
              ${log.title}
            </a>
            <span class = "text-accent text-xs pr-2">
              ${ratingStars}
            </span>
            <span class= "${log.likeStatus ? "text-orange text-xs" : "hidden"} ">
                <i class = "fa-solid fa-heart"></i>
            </span>
          </div>
          <div class="${log.content ? "inline pl-2 " : "hidden"} " id="reviewed-icon"> 
                <a href=".././singleReview/?id=${log.reviewId}" >
                  <i class="fa-solid fa-ticket-simple text-xs text-subText  hover:text-white"></i>
                </a>
          </div>

        </div>
      </div>
      <div class="h-[1px] bg-primary"></div>`;

    contentEl.appendChild(divEl);
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
  await fetchDiary(page);
}
