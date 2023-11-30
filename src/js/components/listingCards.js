import { updateCountdown, scrollingTitle } from "../utilities/index.js";
import { DEFAULT_URLS, listingModalPreview } from "./index.js";
import { getUser } from "../storage/index.js";
import { deleteListing, editListing } from "../auth/index.js";

export function createCard(listing, containerSelector) {
  const listingsContainer = document.querySelector(containerSelector);

  let listingMedia = "";
  let listingBids = "";
  const listingEndsAt = new Date(listing.endsAt);

  if (listing.media.length === 0) {
    listingMedia = `<img src="../../src/images/bidify_nomediasvg.svg" class="card-img-top no-media-found" alt="Listing image">`;
  } else {
    listingMedia = `<img src="${listing.media[0]}" class="card-img-top" alt="Listing image" onerror='this.src="${DEFAULT_URLS.LISTING_MEDIA}";this.classList.add("no-media-found")'>`;
  }

  if (listing.bids && listing.bids.length > 0) {
    listing.bids.reverse();
    listingBids = `<p class="card-text">Current bid: <span class="fw-semibold">${listing.bids[0].amount}c</span></p>`;
  } else {
    listingBids = `<p class="card-text">No bids yet</p>`;
  }

  const card = document.createElement("div");
  card.classList.add("col-12", "col-sm-6", "col-lg-4", "mb-4");

  card.innerHTML = `
        <div class="listing-card" data-id="${listing.id}">
          <div class="card">

              <div class="card-top listing-card-top" data-bs-toggle="modal" data-bs-target="#listingModal">
                  ${listingMedia}
              </div>

              <div class="card-body pt-5 pb-4 ps-0">
              ${listingBids}
              </div>

              <div class="card-buttons d-flex justify-content-between align-items-end">
                  <button class="btn-heart">
                      <p class="material-icons">favorite_border</p>
                  </button>
              </div>

          </div>
        </div>`;

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

  card.querySelector(".card-top").appendChild(countdownContainer);

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

  listingsContainer.appendChild(card);

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

  if (listing.seller && listing.seller.name !== getUser().name) {
    const cardButton = document.createElement("button");
    cardButton.classList.add("btn-gavel");
    cardButton.setAttribute("data-bs-toggle", "modal");
    cardButton.setAttribute("data-bs-target", "#listingModal");
    cardButton.innerHTML = `<p class="material-icons">gavel</p>`;

    card.querySelector(".card-buttons").prepend(cardButton);

    const gavelButton = card.querySelector(".btn-gavel");
    listingModalPreview(listing, gavelButton);
  } else if (!listing.seller || listing.seller.name == getUser().name) {
    const cardButtons = card.querySelector(".card-buttons");
    cardButtons.classList.remove("justify-content-between");
    cardButtons.classList.add("justify-content-end");
    cardButtons.innerHTML = `
    <button class="btn btn-light rounded-0 rounded-start btn-edit">
      <p class="material-icons">edit</p>
    </button>
    <button class="btn btn-light rounded-0 rounded-end btn-delete">
      <p class="material-icons">delete</p>
    </button>`;

    cardButtons
      .querySelector(".btn-delete")
      .addEventListener("click", deleteListing);

    cardButtons
      .querySelector(".btn-edit")
      .addEventListener("click", editListing);
  }
}

export function createBidCard(bid, containerSelector) {
  const bidsContainer = document.querySelector(containerSelector);

  const card = document.createElement("div");
  card.classList.add("col", "mb-4");
  card.innerHTML = `
  <div class="card" id="${bid.id}">
    <div class="card-body">
      <p>Name: ${bid.bidderName}</p>
      <p>Amount: ${bid.amount}c</p>
    </div>
    <div class="card-body d-flex justify-content-between">
      <p>Created: ${bid.created}</p>
      <p>id: ${bid.id}</p>
    </div>
  </div>`;

  bidsContainer.appendChild(card);
}
