/**
 * Displays the current bid information on a listing card.
 *
 * @param {object} listing - The listing object containing bid information.
 * @param {HTMLElement} card - The card element where bid information will be displayed.
 */
export function listingBids(listing, card) {
  if (listing.bids && listing.bids.length > 0) {
    const currentBid = listing.bids.sort((a, b) => b.amount - a.amount)[0]
      .amount;

    const listingBids = document.createElement("p");
    listingBids.classList.add("card-text");
    listingBids.innerHTML = `<p class="card-text">Current bid: <span class="fw-normal text-primary">$${currentBid}</span> (${listing._count.bids})</p>`;

    card.querySelector(".card-body").append(listingBids);
  } else {
    card.querySelector(
      ".card-body"
    ).innerHTML = `<p class="card-text">No bids yet</p>`;
  }
}
