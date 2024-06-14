import { APIv2_URLS, headers, getSingleListing } from "../index.js";
import { alert } from "../../utilities/index.js";

/**
 * Submits a bid for a specific listing.
 *
 * @param {string} id - The unique ID for the listing.
 * @param {number} amount - The bid amount to be submitted.
 * @returns {Promise<object>} - A promise that resolves to the response of the bid request.
 * @throws {error} - Throws an error if the bid submission fails.
 */
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
		const response = await fetch(`${APIv2_URLS.LISTINGS}/${id}/bids`, {
			method: "POST",
			body: JSON.stringify({ amount: amount }),
			headers: headers("application/json", true),
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

			const json = await response.json();

			return json.data;
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
