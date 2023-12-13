export function listingBids(listing, card) {
  if (listing.bids && listing.bids.length > 0) {
    let bidsArray = [...listing.bids];
    bidsArray.reverse();

    const listingBids = document.createElement("p");
    listingBids.classList.add("card-text");
    listingBids.innerHTML = `<p class="card-text">Current bid: <span class="fw-medium text-primary">$${bidsArray[0].amount}</span> (${listing._count.bids})</p>`;

    card.querySelector(".card-body").append(listingBids);
  } else {
    card.querySelector(
      ".card-body"
    ).innerHTML = `<p class="card-text">No bids yet</p>`;
  }
}
