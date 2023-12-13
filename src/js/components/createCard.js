import {
  countdownCard,
  scrollingTitle,
  getListingValues,
  formatDate,
  detailsListItem,
} from "../utilities/index.js";
import {
  listingModalPreview,
  listingMedia,
  listingBids,
  cardHtml,
  checkboxState,
} from "./index.js";
import { getItem } from "../storage/index.js";
import { deleteListingEvent, editListingEvent } from "../events/index.js";
import { getSingleListing } from "../api/index.js";

export function createCard(listing, containerSelector) {
  const listingsContainer = document.querySelector(containerSelector);
  const listingEndsAt = new Date(listing.endsAt);

  const card = document.createElement("div");
  card.classList.add("col-12", "col-sm-6", "col-lg-4", "mb-4");

  cardHtml(card, listing.id);
  listingBids(listing, card);
  listingMedia(listing, card);
  countdownCard(card, listingEndsAt, listingsContainer);
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
  listingModalPreview(listing, cardTop);

  if (getItem("name")) {
    if (listing.seller && listing.seller.name !== getItem("name")) {
      const cardButton = document.createElement("button");
      cardButton.classList.add("btn-gavel");
      cardButton.setAttribute("data-bs-toggle", "modal");
      cardButton.setAttribute("data-bs-target", "#listingModal");
      cardButton.innerHTML = `<p class="material-icons">gavel</p>`;
      card.querySelector(".card-buttons").prepend(cardButton);
      const gavelButton = card.querySelector(".btn-gavel");
      listingModalPreview(listing, gavelButton);
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

export async function createBidCard(bid, containerSelector) {
  const bidsContainer = document.querySelector(containerSelector);
  const listing = await getSingleListing(bid.listing.id);
  const sortedListing = listing.bids.sort((a, b) => b.amount - a.amount);
  const listingEndsAt = new Date(bid.listing.endsAt);
  const card = document.createElement("div");
  card.classList.add("col-12", "col-sm-6", "col-lg-4", "mb-4", "listing-bid");

  cardHtml(card, bid.listing.id, false);

  const cardTop = card.querySelector(".card-top");
  listingModalPreview(listing, cardTop);
  listingMedia(bid.listing, card);
  countdownCard(card, listingEndsAt, bidsContainer);
  checkboxState("Bids", bidsContainer);

  const listGroup = card.querySelector(".list-group");

  listGroup.innerHTML += detailsListItem(
    "Your bid",
    `<span class="fw-medium text-primary">$${bid.amount}</span>`
  );
  listGroup.innerHTML += detailsListItem(
    "Current bid",
    `<span class="fw-medium text-primary">$${sortedListing[0].amount}</span>`
  );
  listGroup.innerHTML += detailsListItem(
    "Date",
    formatDate(new Date(bid.created))
  );
  listGroup.innerHTML += detailsListItem("Bid ID", bid.id.slice(0, 8));

  bidsContainer.appendChild(card);
}

export async function createWinCard(win, containerSelector) {
  const winsContainer = document.querySelector(containerSelector);
  const listing = await getSingleListing(win.id);
  const card = document.createElement("div");
  card.classList.add("col-12", "col-sm-6", "col-lg-4", "mb-4", "listing-win");

  cardHtml(card, win.id, false);

  const cardTop = card.querySelector(".card-top");
  listingModalPreview(listing, cardTop);
  listingMedia(win, card);

  const listGroup = card.querySelector(".list-group");

  listGroup.innerHTML += detailsListItem("Title", win.title);
  listGroup.innerHTML += detailsListItem(
    "Created",
    formatDate(new Date(win.created))
  );
  listGroup.innerHTML += detailsListItem(
    "Ended at",
    formatDate(new Date(win.endsAt), true)
  );
  listGroup.innerHTML += detailsListItem("ID", win.id.slice(0, 8));

  winsContainer.appendChild(card);
}
