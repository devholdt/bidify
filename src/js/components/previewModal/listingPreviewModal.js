import { removeQueryString } from "../../utilities/index.js";
import { fetchBidHistory } from "../index.js";
import { createListingDetails, createMedia } from "./index.js";

document.addEventListener("reload", removeQueryString("id"));

export function listingPreviewModal(listing, button) {
  button.addEventListener("click", () => {
    createListingDetails(listing);
    createMedia(listing);
    fetchBidHistory(listing);
  });
}
