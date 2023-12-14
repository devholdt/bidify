import {
  formatDate,
  detailsListItem,
  setQueryString,
  removeQueryString,
} from "../../utilities/index.js";
import { setupInteractionButtons } from "./index.js";

export function createListingDetails(listing) {
  setQueryString("id", listing.id);
  const modal = document.querySelector("#listingModal");
  const title = document.querySelector("#listingModalTitle");
  const details = document.querySelector("#listingModalDetails");
  const description = document.querySelector("#listingModalDescription");
  const createdDate = formatDate(new Date(listing.created), true);
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

  sellerName = listing.seller.name;

  listingModalFooterDynamic.innerHTML = "";

  setupInteractionButtons(listingModalFooterDynamic, listing, listingForm);

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

  title.innerHTML = `
  <p class="fw-bold fs-4 text-heading mb-0">${listing.title}</p>
  <span class="fw-light d-flex align-items-center pe-2 me-4">id: ${listing.id.slice(
    0,
    8
  )}</span>`;

  if (!listing.description) {
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
    document.querySelector(".alert-preview").innerHTML = "";
    details.innerHTML = "";
    removeQueryString("id");

    if (modal.querySelector("#listingModalForm")) {
      amount.value = "";
    }
  });
}
