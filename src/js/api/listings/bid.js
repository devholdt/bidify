import { API_URLS, headers, getListing } from "../index.js";
import { alert } from "../../utilities/index.js";

export async function bidListing(event) {
  event.preventDefault();

  let currentBid = 0;

  const id = event.target.dataset.id;
  const url = `${API_URLS.LISTINGS}/${id}/bids`;
  const amount = parseInt(document.querySelector("#amount").value);
  const listing = await getListing(id);

  if (listing.bids.length > 0) {
    const highestBid = listing.bids.sort((a, b) => b.amount - a.amount)[0]
      .amount;
    currentBid = highestBid;
  }

  if (amount <= currentBid) {
    alert(
      "danger",
      `Your bid of <strong>${amount}</strong> credit(s) must exceed the current highest bid of <strong>${currentBid}</strong>`,
      ".alert-listing",
      null
    );

    return;
  }

  try {
    const response = await fetch(`${API_URLS.LISTINGS}/${id}/bids`, {
      method: "POST",
      body: JSON.stringify({ amount: amount }),
      heades: headers("application/json"),
    });

    if (response.ok) {
      alert(
        "success",
        `Your bid of ${amount} credit(s) on "${listing.title}" accepted! Good luck!`,
        ".alert-listing",
        null
      );
    } else {
      alert(
        "danger",
        `An error occured when attempting to place a bid on listing "${listing.title}"`,
        ".alert-listing",
        null
      );
    }
  } catch {
    alert(
      "danger",
      `An error occured when attempting to place a bid on listing ${listing.id}`,
      ".alert-listing",
      null
    );
  }
}
