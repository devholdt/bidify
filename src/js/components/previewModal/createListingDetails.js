import {
	formatDate,
	detailsListItem,
	setQueryString,
	removeQueryString,
} from "../../utilities/index.js";
import { setupInteractionButtons } from "./index.js";

/**
 * Populates the listing preview modal with details from a given listing.
 *
 * @param {object} listing - The listing object containing details to display.
 */
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
    <div class="d-flex bg-light border rounded-2 shadow-sm p-2">
      <form id="listingModalForm"
        class="d-flex align-items-end justify-content-between align-items-center me-1 w-100">
        <div class="input-group d-flex align-items-center w-100">
          <span class="input-group-text text-primary bg-white px-2">$</span>
          <input type="number" class="form-control bg-white" name="amount" id="amount" placeholder="amount" min="${
						bidAmount + 1
					}" aria-label="Bid amount">
          <button type="submit" id="placeBidButton" class="btn btn-primary text-uppercase btn-sm py-2 px-1" data-id="${
						listing.id
					}">
            Place bid
          </button>
        </div>
      </form>
      <button type="button" class="btn btn-outline-dark d-flex align-items-center btn-sm ms-auto text-nowrap" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBidHistory" aria-controls="offcanvasBidHistory" aria-label="Bid history">
        <span class="material-icons me-1 fs-5">history</span><span class="d-none d-sm-block">bid history</span>
      </button>
    </div>`;

	sellerName = listing.seller.name;

	listingModalFooterDynamic.innerHTML = "";

	setupInteractionButtons(listingModalFooterDynamic, listing, listingForm);

	details.innerHTML += detailsListItem("Seller", sellerName);

	if (listing.bids.length > 0) {
		let bidderName;
		bidderName = listing.bids[0].bidder.name;

		if (bidderName.length > 10) {
			bidderName = listing.bids[0].bidderName.substring(0, 10) + "...";
		}
		currentBidder = `<span class="text-primary fw-normal">$${listing.bids[0].amount}</span> (${bidderName})`;

		details.innerHTML += detailsListItem("Current bid", currentBidder);
	} else {
		details.innerHTML += detailsListItem("Current bid", "no bids yet");
	}

	details.innerHTML += detailsListItem("Created", createdDate);
	details.innerHTML += detailsListItem("Ends at", endsAtDate);

	title.innerHTML = `
  <p class="fw-semibold fs-4 text-heading mb-0 text-truncate">${
		listing.title
	}</p>
  <span class="fw-light d-flex align-items-center mx-2 text-nowrap d-none d-md-block">id: ${listing.id.slice(
		0,
		5
	)}</span>`;

	if (!listing.description) {
		description.innerHTML = `<div class="fst-italic">No description</div>`;
	} else {
		description.innerHTML = listing.description;
	}

	let tagsHtml = listing.tags
		.map((tag) => {
			return `<span class="fw-normal badge bg-dark listing-tag">${tag}</span>`;
		})
		.join(" ");

	if (listing.tags.length > 0) {
		listing.tags.forEach((tag) => {
			if (tag === "") {
				tagsHtml = `<span class="fw-normal badge bg-dark listing-tag">tag</span>`;
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
