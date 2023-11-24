import * as auth from "../auth/index.js";

export const modals = () => {
  const formModals = document.querySelectorAll(".form-modal");

  formModals.forEach((modal) => {
    const registerForm = modal.querySelector("#registerForm");
    const loginForm = modal.querySelector("#loginForm");

    if (registerForm) {
      registerForm.addEventListener("submit", auth.registerEvent);
    } else if (loginForm) {
      loginForm.addEventListener("submit", auth.loginEvent);
    }

    modal.addEventListener("hidden.bs.modal", () => {
      const form = modal.querySelector("form");
      const alert = modal.querySelector(".alert-wrapper");

      form.reset();
      alert.innerHTML = "";
    });
  });
};
