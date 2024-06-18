import {
	countdownCard,
	scrollingTitle,
	getListingValues,
	formatDate,
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

	listingsContainer.appendChild(card);
}

/**
 * Creates a table row for a given listing and appends it to a specified container.
 *
 * @param {Object} listing - The listing object containing the data for the row.
 * @param {string} containerSelector - The CSS selector of the container where the row will be appended.
 * @return {void}
 */
export function createListingRow(listing, containerSelector) {
	const listingsContainer = document.querySelector(containerSelector);
	const endsAtDate = new Date(listing.endsAt);
	const tableRow = document.createElement("tr");
	tableRow.setAttribute("id", listing.id);
	tableRow.setAttribute("role", "button");

	tableRow.innerHTML += `
        <td class="clickable-cell">
            <span class="text-nowrap fw-normal d-block text-truncate" style="max-width: 110px;">
                ${listing.title}
            </span>
        </td>
        <td class="clickable-cell">${listing.bids.length}</td>
        <td class="clickable-cell">${formatDate(new Date(listing.created))}</td>
        <td class="countdown-small clickable-cell"></td>
        <td class="d-flex justify-content-center p-1">
            <button class="btn btn-light border rounded-0 w-50 rounded-start btn-edit d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#editListingModal" data-id="${
							listing.id
						}">
                <span class="material-icons fs-5">edit</span>
            </button>
            <button class="btn btn-light border rounded-0 w-50 rounded-end btn-delete d-flex justify-content-center align-items-center" data-id="${
							listing.id
						}">
                <span class="material-icons fs-5">delete</span>
            </button>
        </td>
    `;

	const clickableCell = tableRow.querySelectorAll(".clickable-cell");

	clickableCell.forEach((cell) => {
		cell.setAttribute("data-bs-toggle", "modal");
		cell.setAttribute("data-bs-target", "#listingModal");

		listingPreviewModal(listing, cell);
	});

	listingsContainer.appendChild(tableRow);
	countdownCard(tableRow, ".countdown-small", endsAtDate, listingsContainer);

	tableRow
		.querySelector(".btn-delete")
		.addEventListener("click", deleteListingEvent);
	tableRow
		.querySelector(".btn-edit")
		.addEventListener("click", getListingValues);
}

/**
 * Creates a row in the bids table for a given bid and listing, and appends it to a specified container.
 * If a row for the same listing already exists, checks if the new bid is higher and updates the row accordingly.
 *
 * @param {object} bid - The bid object containing data for the row.
 * @param {object} listing - The listing object associated with the bid.
 * @param {string} containerSelector - The CSS selector of the container where the row will be appended.
 * @param {Map} highestBidsMap - A map to store the highest bid for each listing.
 */
export function createBidRow(bid, listing, containerSelector, highestBidsMap) {
	const bidsContainer = document.querySelector(containerSelector);
	const endsAtDate = new Date(bid.listing.endsAt);

	const existingRow = bidsContainer.querySelector(
		`tr[data-listing-id="${listing.id}"]`
	);
	const userBid = bid.amount;

	if (existingRow && userBid <= highestBidsMap[listing.id]) {
		return;
	}

	const tableRow = document.createElement("tr");
	tableRow.setAttribute("id", bid.id);
	tableRow.setAttribute("data-listing-id", listing.id);
	tableRow.setAttribute("role", "button");
	tableRow.setAttribute("data-bs-toggle", "modal");
	tableRow.setAttribute("data-bs-target", "#listingModal");

	tableRow.classList.add("table-row");

	listingPreviewModal(listing, tableRow);

	const highestBid =
		highestBidsMap[listing.id] ||
		listing.bids.reduce((max, bid) => Math.max(max, bid.amount), 0);

	const isClosed = bid.listing.endsAt < new Date().toISOString();
	const isWinning = userBid >= highestBid;
	const isOutbid = userBid < highestBid;

	const statusCell = `
		<div class="d-flex justify-content-between">
			<span>${
				isClosed && isWinning
					? `<span class="fw-normal text-success">Won</span>`
					: isOutbid
					? "Outbid"
					: "Winning"
			}</span>
			${
				isClosed && !isWinning
					? "🔴"
					: isClosed && isWinning
					? "🎉"
					: isOutbid
					? "🟡"
					: "🟢"
			}
		</div>`;

	if (isClosed) tableRow.classList.add("d-none");

	const statusClassMap = {
		default: "table-light",
		outbid: "table-warning",
		closed: "table-danger",
	};

	const statusClass =
		statusClassMap[
			isClosed
				? isWinning
					? "won"
					: "closed"
				: isOutbid
				? "outbid"
				: "default"
		];

	tableRow.classList.add(statusClass);

	tableRow.innerHTML = `
        <td>
			<span class="text-nowrap fw-normal d-block text-truncate" style="max-width: 110px;">
				${bid.listing.title}
			</span>
        </td>
        <td class="bid-amount">$${bid.amount}</td>
        <td>${formatDate(new Date(bid.created))}</td>
		<td class="countdown-small"></td>
        <td>${statusCell}</td>
    `;

	if (existingRow) {
		existingRow.replaceWith(tableRow);
	} else {
		bidsContainer.appendChild(tableRow);
	}

	countdownCard(tableRow, ".countdown-small", endsAtDate, bidsContainer);

	highestBidsMap[listing.id] = userBid;
}

/**
 * Creates a row element for a won listing and appends it to a specified container.
 *
 * @param {object} win - The won listing object containing data for the row.
 * @param {string} containerSelector - The CSS selector of the container where the win row will be appended.
 */
export async function createWinRow(win, containerSelector) {
	const winsContainer = document.querySelector(containerSelector);
	const tableRow = document.createElement("tr");

	tableRow.setAttribute("id", win.id);

	tableRow.innerHTML += `
		<td class="text-nowrap">${win.title}</td>
		<td>${formatDate(new Date(win.endsAt))}</td>
		<td class="text-nowrap">${win.id}</td>
	`;

	winsContainer.appendChild(tableRow);
}
