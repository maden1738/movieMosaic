export function displayErrors(message: string, errorContainer: HTMLDivElement) {
  errorContainer.innerHTML = "";

  const error = document.createElement("p");
  error.style.color = "#FF3333";
  error.innerHTML = message;
  errorContainer.appendChild(error);
}
