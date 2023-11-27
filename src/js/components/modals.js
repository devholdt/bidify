import * as auth from "../auth/index.js";

export const modals = () => {
  const formModals = document.querySelectorAll(".form-modal");

  formModals.forEach((modal) => {
    const registerForm = modal.querySelector("#registerForm");
    const loginForm = modal.querySelector("#loginForm");
    const editProfileForm = modal.querySelector("#editProfileForm");

    if (registerForm) {
      registerForm.addEventListener("submit", auth.registerEvent);
    } else if (loginForm) {
      loginForm.addEventListener("submit", auth.loginEvent);
    } else if (editProfileForm) {
      const input = editProfileForm.querySelector("input");
      const submit = editProfileForm.querySelector(".submit-button");

      const handleInput = () => {
        const inputValue = input.value.trim();

        submit.disabled = !inputValue;
      };

      input.addEventListener("input", handleInput);
      editProfileForm.addEventListener("submit", auth.editProfileEvent);
    }

    modal.addEventListener("hidden.bs.modal", () => {
      const form = modal.querySelector("form");
      const alert = modal.querySelector(".alert-wrapper");

      form.reset();
      alert.innerHTML = "";
    });
  });
};
