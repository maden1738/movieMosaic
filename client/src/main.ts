import { SignupSchema } from "./schema/user";
import { validateForm } from "./utils/validator";
import axios from "axios";
import { ISignupData } from "./interface/user";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { IFilm } from "./interface/film";

const signupForm = document.getElementById("sign-up") as HTMLFormElement;
const loginForm = document.getElementById("login-form") as HTMLFormElement;
const getStartedEl = document.getElementById(
  "get-started",
) as HTMLButtonElement;
const signupModalEl = document.getElementById("signup-modal") as HTMLDivElement;
const exitSignupModal = document.getElementById(
  "exit-signup-modal",
) as HTMLElement;
const loginIconEl = document.getElementById("login-icon") as HTMLElement;
const signupErrorContainer = document.querySelector(
  ".signup-error-container",
) as HTMLDivElement;
const loginErrorContainer = document.querySelector(
  ".login-error-container",
) as HTMLDivElement;
const loginBody = document.getElementById("login-body") as HTMLElement;
const popularMoviesContainer = document.querySelector(
  ".popular-movies",
) as HTMLDivElement;

getStartedEl.addEventListener("click", () => {
  signupModalEl.classList.toggle("hidden");
});

exitSignupModal.addEventListener("click", () => {
  signupModalEl.classList.toggle("hidden");
});

loginIconEl.addEventListener("click", () => {
  loginBody.classList.toggle("hidden");
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const target = event.target as HTMLFormElement;

  const formData = {
    email: target.email.value,
    name: target.username.value,
    password: target.password.value,
  };

  const errors = validateForm(formData, SignupSchema);

  if (errors) {
    console.log(errors);
    displayErrors(errors[0].message, signupErrorContainer);
  } else {
    submitSignupForm(formData);
  }
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const target = event.target as HTMLFormElement;

  const formData = {
    email: target.loginEmail.value,
    password: target.loginPassword.value,
  };

  axios
    .post("http://localhost:3000/auth/login", formData)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("token", res.data.data.accessToken);
    })
    .catch((error) => {
      displayErrors(error.response.data.message, loginErrorContainer);
    });
});

function displayErrors(message: string, errorContainer: HTMLDivElement) {
  errorContainer.innerHTML = "";

  const error = document.createElement("p");
  error.style.color = "#FF3333";
  error.innerHTML = message;
  errorContainer.appendChild(error);
}

function submitSignupForm(formData: ISignupData) {
  axios
    .post(`http://localhost:3000/auth/signup`, formData)
    .then(() => {
      Toastify({
        text: "User signed up",
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "black",
          color: "white",
        },
      }).showToast();

      signupModalEl.classList.toggle("hidden");
    })
    .catch((err) => {
      displayErrors(err.response.data.message, signupErrorContainer);
    });
}

axios.get("http://localhost:3000/movies?sortBy=popularityDesc").then((res) => {
  renderPopularMovies(res.data.data);
});

function renderPopularMovies(data: Array<IFilm>) {
  data.forEach((film) => {
    const filmContainer = document.createElement("div");
    filmContainer.classList.add("w-[100px]");
    const poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w500${film.posterUrl}`;
    filmContainer.appendChild(poster);
    popularMoviesContainer.appendChild(filmContainer);
  });
}
