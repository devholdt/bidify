import * as components from "./components/index.js";
import * as profiles from "./api/profiles/index.js";
import * as storage from "./storage/index.js";
import * as events from "./events/index.js";

const name = storage.getItem("name");

if (!name) {
	window.location.href = components.URLS.INDEX;
}

const title = document.querySelector("title");
title.innerHTML = `Bidify | ${name}'s profile`;

components.authModals();
components.renderNav();
components.createListingForm();

profiles.profileListings();
profiles.profileBids();
profiles.profileWins();
profiles.renderProfileDetails();

events.elementVisibility("#buttonScrollUp", "d-flex", 600);
events.scrollToTop();

document.addEventListener("DOMContentLoaded", () => {
	const headers = document.querySelectorAll("th[data-column]");

	headers.forEach((header) => {
		header.addEventListener("click", () => {
			const column = header.getAttribute("data-column");
			const order = header.getAttribute("data-order");
			const table = header.closest("table");
			const tbody = table.querySelector("tbody");
			const rows = Array.from(tbody.querySelectorAll("tr"));

			const newOrder = order === "asc" ? "desc" : "asc";
			header.setAttribute("data-order", newOrder);

			const sortedRows = rows.sort((a, b) => {
				const aValue = getCellValue(column, a);
				const bValue = getCellValue(column, b);

				if (
					column.includes("amount") ||
					column.includes("created") ||
					column.includes("ends_in") ||
					column.includes("bids") ||
					column.includes("ended")
				) {
					return (newOrder === "asc" ? 1 : -1) * (aValue - bValue);
				} else {
					return (newOrder === "asc" ? 1 : -1) * aValue.localeCompare(bValue);
				}
			});

			while (tbody.firstChild) {
				tbody.removeChild(tbody.firstChild);
			}

			sortedRows.forEach((row) => tbody.appendChild(row));
		});
	});
});

/**
 * Retrieves the value of a specific cell in a table row.
 * @param {string} column - The name of the column to retrieve the value from.
 * @param {HTMLTableRowElement} row - The table row element to retrieve the value from.
 * @returns {string|number|Date} - The value of the specified cell.
 */
function getCellValue(column, row) {
	switch (column) {
		case "listing-title":
		case "bid-title":
		case "win-title":
			return row.cells[0].innerText.trim();

		case "listing-bids":
			return parseInt(row.cells[1].innerText.trim(), 10);

		case "bid-amount":
		case "win-amount":
			return parseFloat(row.cells[1].innerText.replace("$", "").trim());

		case "win-id":
			return row.cells[2].innerText.trim();

		case "listing-created":
		case "bid-created":
		case "win-ended":
			return parseFormattedDate(row.cells[2].innerText.trim());

		case "listing-ends_in":
		case "bid-ends_in":
			return new Date(
				row.querySelector(".countdown-small").getAttribute("data-end-date")
			).getTime();

		case "bid-status":
			return row.cells[4].innerText.trim();

		default:
			return row.cells[0].innerText.trim();
	}
}

/**
 * Parses a formatted date string into a timestamp.
 *
 * @param {string} dateString - The formatted date string.
 * @return {number} The timestamp representing the parsed date.
 */
function parseFormattedDate(dateString) {
	const [datePart, timePart] = dateString.split(" ");
	const [day, month, year] = datePart.split("/").map(Number);
	let hours = 0,
		minutes = 0;
	if (timePart) {
		[hours, minutes] = timePart.split(":").map(Number);
	}
	return new Date(year, month - 1, day, hours, minutes).getTime();
}
