import * as auth from "../auth/index.js";
import { deleteListingEvent, bidEvent } from "../events/index.js";
import { DEFAULT_URLS } from "./index.js";
import {
  formatDate,
  getListingValues,
  updateCountdown,
} from "../utilities/index.js";
import { getUser } from "../storage/index.js";
import { setQueryString, removeQueryString } from "../utilities/index.js";

document.addEventListener("reload", removeQueryString("id"));

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
    setQueryString("id", listing.id);
    const modal = document.querySelector("#listingModal");
    const title = document.querySelector("#listingModalTitle");
    const media = document.querySelector("#listingModalMedia");
    const details = document.querySelector("#listingModalDetails");
    const description = document.querySelector("#listingModalDescription");
    const createdDate = formatDate(new Date(listing.created));
    const endsAtDate = formatDate(new Date(listing.endsAt), true);

    const detailsListItem = (label, value) => {
      return `<li class="list-group-item fw-medium d-flex justify-content-between">
        ${label}
        <span class="fw-light">${value}</span>
      </li>`;
    };

    const listingModalFooterDynamic = modal.querySelector(
      "#listingModalFooterDynamic"
    );

    let bidAmount;

    if (listing.bids.length < 1) {
      bidAmount = 0;
    } else {
      bidAmount = listing.bids.sort((a, b) => b.amount - a.amount)[0].amount;
    }

    const listingForm = `
    <div class="bg-light border rounded-2 shadow-sm p-3">
      <p class="mb-0">Current top bid: <span class="text-primary fw-medium">$${bidAmount}</span></p>

      <form id="listingModalForm"
        class="d-flex align-items-end justify-content-between align-items-center mt-2">
        <div class="input-group d-flex align-items-center">
          <span class="input-group-text text-primary bg-white">$</span>
          <input type="number" class="form-control bg-white" name="amount" id="amount" min="1" 
          value="${bidAmount + 1}" aria-label="Bid amount">
          <button type="submit" id="placeBidButton" class="btn btn-primary text-uppercase" data-id="${
            listing.id
          }">
            Place bid
          </button>
        </div>
      </form>

    </div>`;

    const interactionButtons = `
    <div id="listingModalButtons" class="btn-group float-end" role="group"
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

    sellerName = listing.seller.name;

    listingModalFooterDynamic.innerHTML = "";

    if (getUser()) {
      listingModalFooterDynamic.innerHTML = listingForm;

      const listingModalForm = document.querySelector("#listingModalForm");
      listingModalForm.addEventListener("submit", bidEvent);

      if (listing.seller.name === getUser().name) {
        sellerName = "you";
        listingModalFooterDynamic.innerHTML = interactionButtons;

        modal
          .querySelector(".btn-delete")
          .addEventListener("click", deleteListingEvent);
        modal
          .querySelector(".btn-edit")
          .addEventListener("click", getListingValues);
      }
    }

    details.innerHTML += detailsListItem("Seller", sellerName);
    details.innerHTML += detailsListItem("Created", createdDate);
    details.innerHTML += detailsListItem("Ends at", endsAtDate);

    modal.addEventListener("hide.bs.modal", () => {
      document.querySelector(".alert-preview").innerHTML = "";
      removeQueryString("id");

      if (modal.querySelector("#listingModalForm")) {
        amount.value = "";
      }
    });

    media.innerHTML = "";

    const listingEndsAt = new Date(listing.endsAt);

    const countdownContainer = document.createElement("div");
    countdownContainer.classList.add("countdown");

    const daysElement = document.createElement("span");
    const hoursElement = document.createElement("span");
    const minsElement = document.createElement("span");
    const secsElement = document.createElement("span");

    [daysElement, hoursElement, minsElement, secsElement].forEach((element) => {
      element.classList.add("countdown-part");
      countdownContainer.appendChild(element);
    });

    if (listing.media.length < 1) {
      media.classList.remove("media-carousel");
      media.innerHTML = `
        <img src="${DEFAULT_URLS.LISTING_MEDIA}" class="w-100 h-100 border object-fit-cover" alt="Listing media" onerror="this.src='${DEFAULT_URLS.LISTING_MEDIA}'">`;
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

        carouselItem.innerHTML = `<img src="${media}" class="d-block w-100 h-100 object-fit-cover" alt="Listing media" onerror="this.src='${DEFAULT_URLS.LISTING_MEDIA}'">`;
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
      <img src="${listing.media[0]}" class="w-100 h-100 border object-fit-cover" alt="Listing media" onerror="this.src='${DEFAULT_URLS.LISTING_MEDIA}'">`;
    }

    modal.querySelector("#listingModalMedia").appendChild(countdownContainer);

    updateCountdown(
      listingEndsAt,
      daysElement,
      hoursElement,
      minsElement,
      secsElement
    );
    countdownContainer.countdownInterval = setInterval(() => {
      updateCountdown(
        listingEndsAt,
        daysElement,
        hoursElement,
        minsElement,
        secsElement
      );
    }, 1000);

    if (daysElement.innerHTML === "Expired") {
      countdownContainer.classList.add("listing-expired");
    }

    title.innerHTML = `
      <h5 class="fw-bold fs-4 align-self-center align-items-center my-auto">${
        listing.title
      }</h5>
      <span class="fw-light align-self-center align-items-center my-auto">id: ${listing.id.slice(
        0,
        8
      )}</span>`;

    if (listing.description.length < 1) {
      description.innerHTML = `<div class="fst-italic">No description</div>`;
    } else {
      description.innerHTML = listing.description;
    }

    let tagsHtml = listing.tags
      .map((tag) => {
        return `<span class="fw-medium badge bg-dark listing-tag">${tag}</span>`;
      })
      .join(" ");

    if (listing.tags.length > 0) {
      listing.tags.forEach((tag) => {
        if (tag === "") {
          // Populate existing tags with no inner text
          tagsHtml = `<span class="fw-medium badge bg-dark listing-tag">tag</span>`;
        }
      });

      details.innerHTML += detailsListItem("Tags", tagsHtml);
    } else {
      details.innerHTML += detailsListItem(
        "Tags",
        `<span class="fw-light">empty</span>`
      );
    }

    modal.addEventListener("hidden.bs.modal", () => {
      details.innerHTML = "";
    });
  });
}
