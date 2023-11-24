import { updateCountdown } from "../utilities/index.js";
import { DEFAULT_URLS } from "./index.js";

export function createCard(listing, containerSelector) {
  const listingsContainer = document.querySelector(containerSelector);

  let listingMedia = "";
  let listingBids = "";
  const listingEndsAt = new Date(listing.endsAt);

  if (listing.bids && listing.bids.length > 0) {
    listing.bids.reverse();
  }

  if (listing.media.length === 0) {
    listingMedia = `<img src="../../src/images/bidify_nomediasvg.svg" class="card-img-top no-media-found" alt="Listing image">`;
  } else {
    listingMedia = `<img src="${listing.media[0]}" class="card-img-top" alt="Listing image" onerror='this.src="${DEFAULT_URLS.LISTING_MEDIA}";this.classList.add("no-media-found")'>`;
  }

  if (listing.bids.length === 0) {
    listingBids = `<p class="card-text">No bids yet</p>`;
  } else {
    listingBids = `<p class="card-text">Current bid: <span class="fw-semibold">${listing.bids[0].amount}c</span></p>`;
  }

  const card = document.createElement("div");
  card.classList.add("col", "mb-4");

  card.innerHTML = `
        <div class="card">

            <div class="card-top">
                ${listingMedia}
            </div>

            <div class="card-body pt-5 pb-4 ps-0">
              ${listingBids}
            </div>

            <div class="card-buttons">
                <button class="btn-gavel">
                    <p class="material-icons">gavel</p>
                </button>
                <button class="btn-heart">
                    <p class="material-icons">favorite_border</p>
                </button>
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

  const carousel = document.querySelector(".carousel");

  if (carousel) {
    function addScrollingTitleClass() {
      const maxWidth = 294;
      const titles = carousel.querySelectorAll("h5");

      titles.forEach((title) => {
        if (title.scrollWidth > maxWidth) {
          title.classList.add("scrolling-title");
        }
      });
    }

    addScrollingTitleClass();

    carousel.addEventListener("slid.bs.carousel", () => {
      addScrollingTitleClass();
    });
  }
}

export function createBidCard(bid, containerSelector) {
  const bidsContainer = document.querySelector(containerSelector);

  const card = document.createElement("div");
  card.classList.add("col", "mb-4");
  card.innerHTML = `
  <div class="card">
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
