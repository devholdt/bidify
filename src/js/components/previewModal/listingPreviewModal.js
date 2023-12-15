import { removeQueryString } from "../../utilities/index.js";
import { fetchBidHistory } from "../index.js";
import { createListingDetails, createMedia } from "./index.js";

document.addEventListener("reload", removeQueryString("id"));

/**
 * Initializes the modal preview for a specific listing when a button is clicked.
 *
 * @param {object} listing - The listing object to be displayed in the modal.
 * @param {HTMLElement} button - The button element that triggers the modal preview.
 */
export function listingPreviewModal(listing, button) {
  button.addEventListener("click", () => {
    createListingDetails(listing);
    createMedia(listing);
    fetchBidHistory(listing);
  });
}
