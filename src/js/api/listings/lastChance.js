import { getListings } from "./fetch.js";
import { updateCountdown } from "../../utilities/index.js";

async function getListingsByEndsAt() {
  const listings = await getListings({ limit: 100 });

  const sortedListings = listings.sort(
    (a, b) => new Date(a.endsAt) - new Date(b.endsAt)
  );

  return sortedListings.slice(0, 3);
}

export async function lastChance() {
  const listingsContainer = document.querySelector(".last-chance");

  const listings = await getListingsByEndsAt();

  listings.forEach((listing) => {
    let listingMedia = "";
    let listingBids = "";
    const listingEndsAt = new Date(listing.endsAt);

    if (listing.bids && listing.bids.length > 0) {
      listing.bids.reverse();
    }

    if (listing.media.length === 0) {
      listingMedia = `<img src="https://shorturl.at/inwEL" class="card-img-top" alt="Listing image">`;
    } else {
      listingMedia = `<img src="${listing.media[0]}" class="card-img-top" alt="Listing image">`;
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
                <h5 class="card-title fw-bold">${listing.title}</h5>
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
  });
}
