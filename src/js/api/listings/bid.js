import { API_URLS, headers, getSingleListing } from "../index.js";
import { alert } from "../../utilities/index.js";

export async function bidListing(id, amount) {
  let currentBid = 0;

  const amountInputValue = parseInt(document.querySelector("#amount").value);
  const listing = await getSingleListing(id);

  if (listing.bids.length > 0) {
    const highestBid = listing.bids.sort((a, b) => b.amount - a.amount)[0]
      .amount;
    currentBid = highestBid;
  }

  if (amountInputValue <= currentBid) {
    alert(
      "warning",
      `Your bid of <strong>$${amountInputValue}</strong> must exceed the current highest bid of <strong>${currentBid}</strong>`,
      ".alert-preview",
      null
    );

    return;
  }

  try {
    const response = await fetch(`${API_URLS.LISTINGS}/${id}/bids`, {
      method: "POST",
      body: JSON.stringify({ amount: amount }),
      headers: headers("application/json"),
    });

    if (response.ok) {
      alert(
        "success",
        `Your bid of <strong>${amountInputValue} credit(s)</strong> on <strong>"${listing.title}"</strong> accepted! Good luck!`,
        ".alert-preview",
        null
      );

      setTimeout(() => {
        location.reload();
      }, 3000);

      return await response.json();
    }
  } catch (error) {
    alert(
      "danger",
      `An error occured when attempting to place a bid on listing ${listing.id}`,
      ".alert-preview",
      null
    );
    throw new Error(
      `An error occured when attempting to place a bid on listing: ${error}`
    );
  }
}
