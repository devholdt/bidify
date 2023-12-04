import * as auth from "../auth/index.js";
import { deleteListingEvent, editListingEvent } from "../events/index.js";
import { bidListing } from "../api/listings/index.js";
import { DEFAULT_URLS } from "./index.js";
import { formatDate, getListingValues } from "../utilities/index.js";
import { getUser } from "../storage/index.js";

export const authModals = () => {
  const formModals = document.querySelectorAll(".form-modal");

  formModals.forEach((modal) => {
    const registerForm = modal.querySelector("#registerForm");
    const loginForm = modal.querySelector("#loginForm");
    const editProfileForm = modal.querySelector("#editProfileForm");

    if (registerForm) {
      registerForm.addEventListener("submit", auth.registerEvent);
    }

    if (loginForm) {
      loginForm.addEventListener("submit", auth.loginEvent);
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
    const media = document.querySelector("#listingModalMedia");

    const description = document.querySelector("#listingModalDescription");
    const created = document.querySelector("#listingModalCreated");
    const seller = document.querySelector("#listingModalSeller");

    const endsAt = document.querySelector("#listingModalEndsAt");
    const tags = document.querySelector("#listingModalTags");

    const createdDate = formatDate(new Date(listing.created));
    const endsAtDate = formatDate(new Date(listing.endsAt), true);

    const listingModalFooterDynamic = modal.querySelector(
      "#listingModalFooterDynamic"
    );

    const listingForm = `
    <form id="listingModalForm"
      class="d-flex align-items-end justify-content-between bg-light border align-items-center px-3 pt-2 pb-1 m-auto rounded-2 shadow-sm">
      <div class="mb-3 ps-0">
          <label for="amount" class="form-label mb-0">Bid amount</label>
          <input type="number" class="form-control shadow-sm" name="amount" id="amount"
              min="1" placeholder="credit(s)">
      </div>
      <button type="submit" id="placeBidButton"
          class="btn btn-primary text-uppercase py-2 px-3 fw-semibold fs-5 shadow-sm"
          data-id="${listing.id}">Place
          bid
      </button>
    </form>`;

    const interactionButtons = `
    <div id="listingModalButtons" class="btn-group" role="group"
      aria-label="Listing interaction">
      <button type="button" class="btn btn-light d-flex gap-1 align-items-center btn-edit"
          title="edit" aria-label="edit" data-bs-toggle="modal" data-bs-target="#editListingModal" data-id="${listing.id}">
          <span class="material-icons">edit</span>
      </button>
      <button type="button"
          class="btn btn-light d-flex gap-1 align-items-center btn-delete" title="delete"
          aria-label="delete" data-id="${listing.id}">
          <span class="material-icons">delete</span>
      </button>
    </div>`;

    let sellerName;

    if (listing.seller) {
      if (listing.seller.name === getUser().name) {
        sellerName = "you";
        listingModalFooterDynamic.innerHTML = interactionButtons;

        modal
          .querySelector(".btn-delete")
          .addEventListener("click", deleteListingEvent);
        modal
          .querySelector(".btn-edit")
          .addEventListener("click", getListingValues);
      } else {
        sellerName = listing.seller.name;
        listingModalFooterDynamic.innerHTML = listingForm;

        const placeBidButton = document.querySelector("#placeBidButton");
        placeBidButton.addEventListener("click", bidListing);

        modal.addEventListener("hidden.bs.modal", () => {
          document.querySelector(".alert-listing").innerHTML = "";
          amount.value = "";
        });
      }
    } else {
      sellerName = getUser().name;
      listingModalFooterDynamic.innerHTML = interactionButtons;

      modal
        .querySelector(".btn-delete")
        .addEventListener("click", deleteListingEvent);
      modal
        .querySelector(".btn-edit")
        .addEventListener("click", getListingValues);
    }

    media.innerHTML = "";

    if (listing.media.length < 1) {
      media.classList.remove("media-carousel");
      media.innerHTML = `
        <img src="${DEFAULT_URLS.LISTING_MEDIA}" class="w-100 h-100 border object-fit-cover" alt="Listing media">`;
    } else if (listing.media.length > 1) {
      media.classList.add("media-carousel");

      media.innerHTML = `
      <div id="listingModalCarousel" class="carousel slide carousel-fade">
      <div id="listingModalCarouselInner" class="carousel-inner"></div>
      <div class="carousel-indicators"></div>
      </div>`;

      const carouselIndicators = document.querySelector(".carousel-indicators");
      const carouselInner = document.querySelector(
        "#listingModalCarouselInner"
      );

      listing.media.forEach((media, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (index === 0) carouselItem.classList.add("active");

        carouselItem.innerHTML = `<img src="${media}" class="d-block w-100 h-100 object-fit-cover" alt="Listing media">`;
        carouselInner.appendChild(carouselItem);

        const indicator = document.createElement("button");
        indicator.classList.add("carousel-thumbnail");
        if (index === 0) {
          indicator.classList.add("active");
        }
        indicator.setAttribute("data-bs-target", "#listingModalCarousel");
        indicator.setAttribute("data-bs-slide-to", index);
        indicator.style.background = `no-repeat center url(${media})`;
        indicator.style.backgroundSize = "cover";
        carouselIndicators.appendChild(indicator);
      });
    } else {
      media.classList.remove("media-carousel");
      media.innerHTML = `
      <img src="${listing.media[0]}" class="w-100 h-100 border object-fit-cover" alt="Listing media">`;
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

    seller.innerHTML = sellerName;
    created.innerHTML = createdDate;
    endsAt.innerHTML = endsAtDate;

    if (listing.tags.length < 1) {
      tags.innerHTML = "empty";
    } else {
      listing.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.classList.add("fw-bold", "badge", "bg-dark", "ms-1");
        tagElement.innerHTML += `${tag} `;
        tags.append(tagElement);
      });
    }

    // Remove displayed tags to not stack them every time you open modal
    modal.addEventListener("hidden.bs.modal", () => {
      tags.innerHTML = "";
    });
  });
}
