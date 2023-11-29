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
    const description = document.querySelector("#listingModalDescription");
    const created = document.querySelector("#listingModalCreated");
    const seller = document.querySelector("#listingModalSeller");
    const endsAt = document.querySelector("#listingModalEndsAt");
    const tags = document.querySelector("#listingModalTags");
    const form = document.querySelector("#listingModalForm");
    const buttons = document.querySelector("#listingModalButtons");

    const createdDate = formatDate(new Date(listing.created));
    const endsAtDate = formatDate(new Date(listing.endsAt), true);
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

    title.innerHTML = `
      <h5 class="fw-bold fs-4 align-self-center align-items-center my-auto">${
        listing.title
      }</h5>
      <span class="fw-light align-self-center align-items-center my-auto">id: ${listing.id.slice(
        0,
        6
      )}</span>`;

    if (listing.description.length < 1) {
      description.innerHTML = `<p class="fst-italic">No description</p>`;
    } else {
      description.innerHTML = `<p class="fw-normal">${listing.description}</p>`;
    }

    created.innerHTML = createdDate;

    seller.innerHTML = sellerName;

    endsAt.innerHTML = endsAtDate;

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
