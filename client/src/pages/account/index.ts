import axiosInstance from "../../axios";
import { IUpdateUserProfile, IUser } from "../../interface/user";
import { updateProfileSchema } from "../../schema/user";
import { displayErrors } from "../../utils/displayError";
import { validateForm } from "../../utils/validator";
import { AxiosError } from "axios";

let params = new URL(document.location.toString()).searchParams;
const id = params.get("id");

const formUsernameEl = document.getElementById("username") as HTMLInputElement;
const formEmailEl = document.getElementById("email") as HTMLInputElement;
const formBioEl = document.getElementById("bio") as HTMLInputElement;
const profileForm = document.getElementById("profile-form") as HTMLFormElement;
const profileErrorContainer = document.getElementById(
  "profile-error-container",
) as HTMLDivElement;

document.addEventListener("DOMContentLoaded", () => {
  fetchProfileInfo();
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const target = event.target as HTMLFormElement;

  const formData = {
    name: target.username.value,
    email: target.email.value,
    bio: target.bio.value,
  };

  const errors = validateForm(formData, updateProfileSchema);

  if (errors) {
    displayErrors(errors[0].message, profileErrorContainer);
  } else {
    submitUpdateProfileForm(formData);
    location.reload();
  }
});

async function submitUpdateProfileForm(formData: IUpdateUserProfile) {
  try {
    await axiosInstance.put(`/users/${id}/profile`, formData);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      displayErrors(error.response.data.message, profileErrorContainer);
    }
  }
}

async function fetchProfileInfo() {
  try {
    const response = await axiosInstance.get(`/users/${id}`);

    populateInputFields(response.data.data);
  } catch (error) {
    console.log(error);
  }
}

function populateInputFields(data: IUser) {
  formUsernameEl.value = data.name;
  formEmailEl.value = data.email;
  formBioEl.value = data.bio ? data.bio : "";
}
