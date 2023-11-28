import * as auth from "../auth/index.js";
import { DEFAULT_URLS } from "./index.js";
import { formatDate } from "../utilities/index.js";
import { getUser } from "../storage/index.js";

export const authModals = () => {
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

export function listingModalPreview(listing, button) {
  button.addEventListener("click", () => {
    const modal = document.querySelector("#listingModal");
    const title = document.querySelector("#listingModalTitle");
    const media = document.querySelector(".listing-media img");
    const body = document.querySelector("#listingModalBody");
    const seller = document.querySelector("#listingModalSeller");
    const id = document.querySelector("#listingModalId");
    const tags = document.querySelector("#listingModalTags");
    const form = document.querySelector("#listingModalForm");
    const buttons = document.querySelector("#listingModalButtons");

    const created = formatDate(new Date(listing.created));
    const endsAt = formatDate(new Date(listing.endsAt));
    let sellerName;

    if (listing.seller.name === getUser().name) {
      sellerName = "you";
      form.classList.add("d-none");
      buttons.classList.remove("d-none");
    } else {
      sellerName = listing.seller.name;
      form.classList.remove("d-none");
      buttons.classList.add("d-none");
    }

    if (listing.media.length < 1) {
      media.src = DEFAULT_URLS.LISTING_MEDIA;
    } else {
      media.src = listing.media[0];
    }

    title.innerHTML = listing.title;

    seller.innerHTML = `- created by ${sellerName} on ${created}`;

    id.innerHTML = `id: ${listing.id.slice(0, 8)}`;

    body.innerHTML = `
      <p class="fw-medium">${listing.description}</p>
      <p class="mb-0">Ends at: <span class="fw-medium">${endsAt}</span></p>`;

    if (listing.tags.length < 1) {
      tags.innerHTML = "empty";
    } else {
      listing.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.classList.add("fw-bold", "badge", "bg-dark", "me-1");
        tagElement.innerHTML += `${tag} `;
        tags.append(tagElement);
      });
    }

    modal.addEventListener("hidden.bs.modal", () => {
      tags.innerHTML = "";
    });
  });
}
