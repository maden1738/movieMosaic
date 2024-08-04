import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import { IReview } from "../../interface/review";
import { convertIntoStar, extractDate } from "../../utils/formatter";

const reviewsEl = document.getElementById("reviews-content") as HTMLDivElement;
const filmTitleEl = document.getElementById(
  "review-film-title",
) as HTMLAnchorElement;

let params = new URL(document.location.toString()).searchParams;
const id = params.get("id");
const contentType = params.get("content");

const user = JSON.parse(localStorage.getItem("user") as string);

document.addEventListener("DOMContentLoaded", () => {
  renderMovieName();

  filmTitleEl.innerHTML = filmTitleEl.href = `../singleFilm/?id=${id}`;

  if (contentType === "recent") {
    fetchReviews();
  } else if (contentType === "friend") {
    fetchFriendReviews();
  }
});

async function renderMovieName() {
  const response = await axiosInstance.get(`/movies/${id}`);

  filmTitleEl.innerHTML = response.data.data.title;
}

async function fetchReviews() {
  try {
    const response = await axiosInstance.get(
      `movies/${id}/reviews/?size=10&sortBy=${contentType}`,
    );

    renderReviews(response.data.data);
  } catch (error) {
    Swal.fire({
      title: "Something went wrong",
      color: "#ccdded",
      background: "#435666",
    });
  }
}

async function fetchFriendReviews() {
  try {
    const response = await axiosInstance.get(
      `users/${user.id}/followers/reviews/movies/${id}?size=10`,
    );
    renderReviews(response.data.data);
  } catch (error) {}
}

function renderReviews(data: Array<IReview>) {
  reviewsEl.innerHTML = "";
  data.forEach((review) => {
    const rating = convertIntoStar(review.rating);

    review.createdAt = extractDate(review.createdAt);
    const divEL = document.createElement("div");
    divEL.innerHTML = ` <section class="wrapper">
      <div class="grid-cols-layout grid gap-4 py-4">
        <div
          class="aspect-square h-[40px] w-[40px] grow overflow-hidden rounded-full hover:cursor-pointer"
        >
          <img
            src=${review.avatarUrl}
            alt="profile picture"
            class="h-full w-full object-cover"
          />
        </div>
        <div>
          <div class="text-sm text-subText flex items-center">
            <span class="pr-2 font-bold text-accent w-fit flex items-center text-xs">${rating}</span>
            <span>Reviewd By </span>
            <span class="px-1 text-base font-bold text-text">${review.name}</span>
            <span>${review.createdAt}</span>
          </div>
          <p class="mt-3 text-text">
            ${review.content}
          </p>
        </div>
      </div>
      <div class="border-[0.25px] border-[#8ea4b4]"></div>
    </section>`;

    reviewsEl.appendChild(divEL);
  });
}
