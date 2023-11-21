import { getListings } from "./fetch.js";
import { formatDate } from "../../utilities/formatDate.js";

export async function displayListings() {
  const listingsContainer = document.querySelector(".listings");

  const listings = await getListings();

  listings.forEach((listing) => {
    let listingMedia = "";
    let listingBids = "";
    const listingEndsAt = new Date(listing.endsAt);
    const formattedDate = formatDate(listingEndsAt);

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

    console.log(listing.bids.length);

    const card = document.createElement("div");
    card.classList.add("col", "mb-4");
    card.innerHTML = `
        <div class="card">

            <div class="card-top">
                <div class="card-date">
                    <p class="m-0">Ends at:</p>
                    <p class="m-0 fs-5 fw-medium listing-end">${formattedDate}</p>
                </div>
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

    listingsContainer.appendChild(card);
  });
}
