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

    if (listing._count.bids === 0) {
      listingBids = "No bids yet";
    } else {
      listingBids = `Bids: ${listing._count.bids}`;
    }

    const card = document.createElement("div");
    card.classList.add("col-12", "col-lg-4", "col-md-6");
    card.innerHTML = `
    <div class="card">
        <div class="card-buttons">
            <button class="btn-gavel">
                <span class="material-icons">gavel</span>
            </button>
            <button class="btn-heart">
                <span class="material-icons">favorite_border</span>
            </button>
        </div>
        <div class="card-date">
            <p class="m-0">Ends at:</p>
            <p class="m-0 fs-5 fw-medium listing-end">${formattedDate}</p>
        </div>
        ${listingMedia}
        <div class="card-body">
            <h5 class="card-title">${listing.title}</h5>
            <p class="card-text">${listingBids}</p>
        </div>
    </div>`;

    listingsContainer.appendChild(card);
  });
}
