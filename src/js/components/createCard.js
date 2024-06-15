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
	titleElement.classList.add("card-title", "text-heading", "fw-semibold");
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
		if (!listing.seller || listing.seller.name == getItem("name")) {
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
 * Creates a table row element for a bid and appends it to a specified container.
 *
 * @param {object} bid - The bid object containing data for the table row.
 * @param {string} containerSelector - The CSS selector of the container where the table row will be appended.
 */
export function createBidRow(bid, containerSelector) {
	const bidsContainer = document.querySelector(containerSelector);
	const endsAtDate = new Date(bid.listing.endsAt);
	const tableRow = document.createElement("tr");
	tableRow.setAttribute("id", bid.listing.id);

	tableRow.innerHTML += `
	<td>
	<span class="text-nowrap fw-normal d-block text-truncate" style="max-width: 110px;">
	${bid.listing.title}
	</span>
	</td>
	<td>$${bid.amount}</td>
	<td>${formatDate(new Date(bid.created))}</td>
	<td class="countdown-small"></td>
	`;

	bidsContainer.appendChild(tableRow);
	countdownCard(tableRow, ".countdown-small", endsAtDate, bidsContainer);
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
