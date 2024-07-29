import axiosInstance from "../../axios";
import { IUser } from "../../interface/user";

const contentEl = document.getElementById("content") as HTMLDivElement;
const followersEl = document.getElementById("followers") as HTMLAnchorElement;
const followingEl = document.getElementById("following") as HTMLAnchorElement;
const userNameEl = document.querySelector(".username") as HTMLDivElement;

let params = new URL(document.location.toString()).searchParams;
const id = params.get("id");
const contentType = params.get("content");

document.addEventListener("DOMContentLoaded", () => {
  followersEl.href = `.././follow/?id=${id}&content=followers`;
  followingEl.href = `.././follow/?id=${id}&content=following`;

  fetchUserName();

  if (contentType === "followers") {
    followersEl.style.color = "white";
    followersEl.style.textDecoration = "underline";
    fetchFollowers();
  } else if (contentType === "following") {
    followingEl.style.color = "white";
    followingEl.style.textDecoration = "underline";
    fetchFollowing();
  }
});

async function fetchUserName() {
  const response = await axiosInstance.get(`/users/${id}`);

  userNameEl.innerHTML = response.data.data.name;
}

async function fetchFollowers() {
  const response = await axiosInstance.get(`/users/${id}/followers/`);
  renderList(response.data.data);
}

async function fetchFollowing() {
  const response = await axiosInstance.get(`/users/${id}/follow/`);
  renderList(response.data.data);
}

function renderList(users: Array<IUser>) {
  users.forEach((user: IUser) => {
    const divContainer = document.createElement("div");
    divContainer.innerHTML = `<div class="flex items-center gap-4 py-2">
        <div class="aspect-square w-[40px] overflow-hidden rounded-full">
          <img
            src="/whitebg.avif"
            alt="profile picture"
            class="h-full w-full"
          />
        </div>
        <a href=".././profile/?id=${user.id}" class="font-semibold text-white">${user.name}</a>
      </div>
      <div class="my-1 h-[1px] bg-primaryDark"></div>`;
    contentEl.appendChild(divContainer);
  });
}
