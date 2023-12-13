import { getListing } from "../api/index.js";
import { formatDate, alert } from "../utilities/index.js";

export async function fetchBidHistory(id) {
  const tableBids = document.querySelector(".table-bids");
  tableBids.innerHTML = `
    <tr class="bg-light text-uppercase">
        <th>Date</th>
        <th>Amount</th>
        <th>Bidder</th>
    </tr>`;

  try {
    const listing = await getListing(id);

    if (listing.bids.length < 1) {
      tableBids.innerHTML = `<p class="px-5 pt-3">This listing does not have any bids yet. Be the first one to bid!</p>`;
    }

    listing.bids
      .sort((a, b) => b.amount - a.amount)
      .forEach((bid) => {
        const bidElement = document.createElement("tr");
        const created = formatDate(new Date(bid.created), true);

        bidElement.innerHTML = `
        <td>${created}</td>
        <td class="text-primary fw-normal">$${bid.amount}</td>
        <td>${bid.bidderName}</td>`;

        tableBids.append(bidElement);
      });
  } catch (error) {
    alert(
      "danger",
      "An error occured when attempting to get bid history",
      ".alert-absolute",
      null
    );
  }
}
