import { deleteListingEvent, bidEvent } from "../events/index.js";
import { DEFAULT_URLS } from "./index.js";
import {
  formatDate,
  getListingValues,
  setQueryString,
  removeQueryString,
  detailsListItem,
} from "../utilities/index.js";
import { getItem } from "../storage/index.js";
import { fetchBidHistory } from "./index.js";

document.addEventListener("reload", removeQueryString("id"));

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
    const listingModalFooterDynamic = modal.querySelector(
      "#listingModalFooterDynamic"
    );

    let bidAmount;
    let sellerName;
    let currentBidder;

    if (listing.bids.length < 1) {
      bidAmount = 0;
    } else {
      bidAmount = listing.bids.sort((a, b) => b.amount - a.amount)[0].amount;
    }

    const listingForm = `
    <div class="bg-light border rounded-2 shadow-sm p-3">

      <div class="d-flex justify-content-between mb-0">
        <p>Current bid: <span class="text-primary fw-medium">$${bidAmount}</span></p>
        <button type="button" class="btn btn-outline-dark d-flex align-items-center" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBidHistory" aria-controls="offcanvasBidHistory">
          <span class="material-icons me-1">history</span>bid history
        </button>
      </div>

      <form id="listingModalForm"
        class="d-flex align-items-end justify-content-between align-items-center mt-2">
        <div class="input-group d-flex align-items-center">
          <span class="input-group-text text-primary bg-white">$</span>
          <input type="number" class="form-control bg-white" name="amount" id="amount" placeholder="amount" min="${
            bidAmount + 1
          }" aria-label="Bid amount">
          <button type="submit" id="placeBidButton" class="btn btn-primary text-uppercase" data-id="${
            listing.id
          }">
            Place bid
          </button>
        </div>
      </form>

    </div>`;

    const interactionButtons = `
    <div class="d-flex justify-content-between">
      <button type="button" class="btn btn-outline-dark d-flex align-items-center" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBidHistory" aria-controls="offcanvasBidHistory">
        <span class="material-icons me-1">history</span>bid history
      </button>
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
      </div>
    </div>`;

    sellerName = listing.seller.name;

    listingModalFooterDynamic.innerHTML = "";

    if (getItem("name")) {
      listingModalFooterDynamic.innerHTML = listingForm;

      const listingModalForm = document.querySelector("#listingModalForm");
      listingModalForm.addEventListener("submit", bidEvent);

      if (listing.seller.name === getItem("name")) {
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

    if (listing.bids.length > 0) {
      let bidderName;
      bidderName = listing.bids[0].bidderName;

      if (bidderName.length > 10) {
        bidderName = listing.bids[0].bidderName.substring(0, 10) + "...";
      }
      currentBidder = `<span class="text-primary fw-medium">$${listing.bids[0].amount}</span> (${bidderName})`;

      details.innerHTML += detailsListItem("Current bid", currentBidder);
    } else {
      details.innerHTML += detailsListItem("Current bid", "no bids yet");
    }

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

    title.innerHTML = `
      <p class="fw-bold fs-4 text-heading mb-0">${listing.title}</p>
      <span class="fw-light d-flex align-items-center pe-2 me-4">id: ${listing.id.slice(
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

    fetchBidHistory(listing.id);
  });
}
