import { deleteListingEvent, bidEvent } from "../../events/index.js";
import { getListingValues } from "../../utilities/index.js";
import { getItem } from "../../storage/index.js";

export function setupInteractionButtons(footer, listing, listingForm) {
  if (getItem("name")) {
    const modal = document.querySelector("#listingModal");
    let sellerName;
    const interactionButtons = `
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-outline-dark d-flex align-items-center" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBidHistory" aria-controls="offcanvasBidHistory">
              <span class="material-icons me-1">history</span>bid history
            </button>
            <div id="listingModalButtons" class="btn-group float-end" role="group"
              aria-label="Listing interaction">
              <button type="button" class="btn btn-light d-flex gap-1 align-items-center btn-edit"
                  title="edit" aria-label="edit" data-bs-toggle="modal" data-bs-target="#editListingModal" data-id="${listing.id}">
                  <span class="material-icons">edit</span>
              </button>
              <button type="button"
                  class="btn btn-light d-flex gap-1 align-items-center btn-delete" title="delete"
                  aria-label="delete" data-id="${listing.id}">
                  <span class="material-icons">delete</span>
              </button>
            </div>
          </div>`;

    footer.innerHTML = listingForm;

    const listingModalForm = document.querySelector("#listingModalForm");
    listingModalForm.addEventListener("submit", bidEvent);

    if (listing.seller.name === getItem("name")) {
      sellerName = "you";
      footer.innerHTML = interactionButtons;

      modal
        .querySelector(".btn-delete")
        .addEventListener("click", deleteListingEvent);
      modal
        .querySelector(".btn-edit")
        .addEventListener("click", getListingValues);
    }
  }
}
