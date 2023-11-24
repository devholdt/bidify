import { registerEvent, loginEvent } from "../auth/index.js";

export const modals = () => {
  document
    .querySelector("#registerForm")
    .addEventListener("submit", registerEvent);
  document.querySelector("#loginForm").addEventListener("submit", loginEvent);
};
