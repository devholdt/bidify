import {
  countdownCard,
  scrollingTitle,
  getListingValues,
  formatDate,
  detailsListItem,
} from "../utilities/index.js";
import {
  listingPreviewModal,
  listingMedia,
  listingBids,
  cardHtml,
  checkboxState,
} from "./index.js";
import { getItem } from "../storage/index.js";
import { deleteListingEvent, editListingEvent } from "../events/index.js";

/**
 * Creates a card element for a listing and appends it to a specified container.
 *
 * @param {object} listing - The listing object containing data for the card.
 * @param {string} containerSelector - The CSS selector of the container where the card will be appended.
 */
export function createCard(listing, containerSelector) {
  const listingsContainer = document.querySelector(containerSelector);
  const listingEndsAt = new Date(listing.endsAt);

  const card = document.createElement("div");
  card.classList.add("col-12", "col-sm-6", "col-lg-4", "mb-4");

  cardHtml(card, listing.id);
  listingBids(listing, card);
  listingMedia(listing, card, ".listing-card-top");
  countdownCard(card, ".card-top", listingEndsAt, listingsContainer);
  checkboxState("Listings", listingsContainer);

  const titleElement = document.createElement("h5");
  titleElement.classList.add("card-title", "fw-bold");
  titleElement.textContent = listing.title;

  const titleWrapper = document.createElement("div");
  titleWrapper.classList.add("title-wrapper");
  titleWrapper.appendChild(titleElement);

  card.querySelector(".card-body").prepend(titleWrapper);

  scrollingTitle();

  const cardTop = card.querySelector(".card-top");
  const gavelButton = card.querySelector(".btn-gavel");
  listingPreviewModal(listing, cardTop);
  listingPreviewModal(listing, gavelButton);

  if (getItem("name")) {
    if (listing.seller && listing.seller.name !== getItem("name")) {
    } else if (!listing.seller || listing.seller.name == getItem("name")) {
      const cardButtons = card.querySelector(".card-buttons");
      cardButtons.classList.remove("justify-content-between");
      cardButtons.classList.add("justify-content-end");
      cardButtons.innerHTML = `
      <button class="btn btn-light rounded-0 rounded-start btn-edit" data-bs-toggle="modal" data-bs-target="#editListingModal" data-id="${listing.id}">
        <span class="material-icons">edit</span>
      </button>
      <button class="btn btn-light rounded-0 rounded-end btn-delete" data-id="${listing.id}">
        <span class="material-icons">delete</span>
      </button>`;

      cardButtons
        .querySelector(".btn-delete")
        .addEventListener("click", deleteListingEvent);

      cardButtons
        .querySelector(".btn-edit")
        .addEventListener("click", getListingValues);

      document
        .querySelector("#editListingForm")
        .addEventListener("submit", editListingEvent);
    }
  }
}

/**
 * Creates a card element for a bid and appends it to a specified container.
 *
 * @param {object} bid - The bid object containing data for the card.
 * @param {string} containerSelector - The CSS selector of the container where the bid card will be appended.
 */
export function createBidCard(bid, containerSelector) {
  const bidsContainer = document.querySelector(containerSelector);
  const endsAtDate = new Date(bid.listing.endsAt);
  const card = document.createElement("div");
  card.classList.add("col-12", "col-md-6", "mb-4", "listing-bid");

  cardHtml(card, bid.listing.id, false);
  listingMedia(bid.listing, card, ".card-media");
  checkboxState("Bids", bidsContainer);

  const listGroup = card.querySelector(".list-group");

  listGroup.innerHTML += detailsListItem(
    "",
    `<span class="countdown-small"></span>`
  );
  listGroup.innerHTML += detailsListItem(
    "Title",
    `<span class="d-block text-truncate" style="max-width: 110px;">${bid.listing.title}</span>`
  );
  listGroup.innerHTML += detailsListItem(
    "Your bid",
    `<span class="fw-medium text-primary">$${bid.amount}</span>`
  );
  listGroup.innerHTML += detailsListItem(
    "Date",
    `<span>${formatDate(new Date(bid.created))}</span>`
  );
  listGroup.innerHTML += detailsListItem(
    "Bid ID",
    `<span>${bid.id.slice(0, 5)}</span>`
  );

  bidsContainer.appendChild(card);

  countdownCard(card, ".countdown-small", endsAtDate, bidsContainer);
}

/**
 * Creates a card element for a won listing and appends it to a specified container.
 *
 * @param {object} win - The won listing object containing data for the card.
 * @param {string} containerSelector - The CSS selector of the container where the win card will be appended.
 */
export async function createWinCard(win, containerSelector) {
  const winsContainer = document.querySelector(containerSelector);
  const card = document.createElement("div");
  card.classList.add("col-6", "mb-4", "listing-bid");

  cardHtml(card, win.id, false);
  listingMedia(win, card, ".card-media");

  const listGroup = card.querySelector(".list-group");

  listGroup.innerHTML += detailsListItem("Title", win.title);
  listGroup.innerHTML += detailsListItem(
    "Ended",
    formatDate(new Date(win.endsAt))
  );
  listGroup.innerHTML += detailsListItem("ID", win.id.slice(0, 5));

  winsContainer.appendChild(card);
}
