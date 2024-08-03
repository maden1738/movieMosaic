import axiosInstance from "../../axios";
import { ILogsResponse } from "../../interface/log";
import { convertIntoStar, extractDayAndMonth } from "../../utils/formatter";

const contentEl = document.getElementById("content") as HTMLElement;
const avatar = document.getElementById("avatar") as HTMLImageElement;
const userNameEl = document.getElementById("name") as HTMLAnchorElement;

let params = new URL(document.location.toString()).searchParams;
const id = params.get("id");
const user = JSON.parse(localStorage.getItem("user") as string);

document.addEventListener("DOMContentLoaded", () => {
  avatar.src = user.avatarUrl;
  userNameEl.innerHTML = user.name;
  userNameEl.href = `.././profile/?id=${id}`;
  fetchDiary();
});

async function fetchDiary() {
  try {
    const response = await axiosInstance.get(`users/${id}/logs`);
    renderDiary(response.data.data);
  } catch (error) {
    console.log(error);
  }
}

function renderDiary(logs: Array<ILogsResponse>) {
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
