import { formatDate, detailsListItem } from "../../utilities/index.js";

export function createBidDetails(bid) {
  const modal = document.querySelector("#listingModal");
  const title = document.querySelector("#listingModalTitle");
  const description = document.querySelector("#listingModalDescription");
  const details = document.querySelector("#listingModalDetails");
  const createdDate = formatDate(new Date(bid.created), true);
  const endsAtDate = formatDate(new Date(bid.listing.endsAt), true);
  const listingModalFooterDynamic = modal.querySelector(
    "#listingModalFooterDynamic"
  );

  listingModalFooterDynamic.innerHTML = "";

  title.innerHTML = `
  <p class="fw-bold fs-4 text-heading mb-0">${bid.listing.title}</p>
  <span class="fw-light d-flex align-items-center pe-2 me-4">id: ${bid.listing.id.slice(
    0,
    8
  )}</span>`;

  if (!bid.listing.description) {
    description.innerHTML = `<div class="fst-italic">No description</div>`;
  } else {
    description.innerHTML = bid.listing.description;
  }

  details.innerHTML += detailsListItem(
    "Your bid",
    `<span class="text-primary fw-normal">$${bid.amount}</span>`
  );
  details.innerHTML += detailsListItem("Date", createdDate);
  details.innerHTML += detailsListItem("Ends at", endsAtDate);

  let tagsHtml = bid.listing.tags
    .map((tag) => {
      return `<span class="fw-medium badge bg-dark listing-tag">${tag}</span>`;
    })
    .join(" ");

  if (bid.listing.tags.length > 0) {
    bid.listing.tags.forEach((tag) => {
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

  details.innerHTML += detailsListItem("ID", bid.id.slice(0, 5));

  modal.addEventListener("hidden.bs.modal", () => {
    document.querySelector(".alert-preview").innerHTML = "";
    details.innerHTML = "";
  });
}
