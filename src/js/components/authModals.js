import * as events from "../events/index.js";

export const authModals = () => {
	const formModals = document.querySelectorAll(".form-modal");

	formModals.forEach((modal) => {
		const registerForm = modal.querySelector("#registerForm");
		const loginForm = modal.querySelector("#loginForm");
		const editProfileForm = modal.querySelector("#editProfileForm");

		if (registerForm) {
			registerForm.addEventListener("submit", events.registerEvent);
		}

		if (loginForm) {
			loginForm.addEventListener("submit", events.loginEvent);
		}

		if (editProfileForm) {
			const input = editProfileForm.querySelector("input");
			const submit = editProfileForm.querySelector(".submit-button");
			const clearButton = document.querySelector(".clear-button");

			const handleInput = () => {
				const inputValue = input.value.trim();

				submit.disabled = !inputValue;
			};

			input.addEventListener("input", handleInput);
			clearButton.addEventListener("click", () => {
				input.value = "";
				handleInput();
			});

			editProfileForm.addEventListener("submit", events.editProfileEvent);
		}

		modal.addEventListener("hidden.bs.modal", () => {
			const form = modal.querySelector("form");
			const alert = modal.querySelector(".alert-wrapper");

			form.reset();
			alert.innerHTML = "";
		});
	});
};
