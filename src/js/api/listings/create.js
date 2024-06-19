import { API_URLS, headers } from "../index.js";
import { alert } from "../../utilities/index.js";
import { getItem } from "../../storage/index.js";

const name = getItem("name");

if (!name) {
	document.querySelector(".create-listing").style.display = "none";
}

/**
 * Creates a new listing with the provided details.
 *
 * @param {string} title - The title of the listing.
 * @param {Date} endsAt - The end date of the listing.
 * @param {string} description - The description of the listing.
 * @param {string[]} media - An array of media URLs of the listing.
 * @param {string[]} tags - An array of tags relevant to the listing.
 * @returns {Promise<object>} - A promise that resolves to the response of the create listing request.
 * @throws {Errror} - Throws an error if the listing creation fails.
 */
export async function createListing(title, endsAt, description, media, tags) {
	const listing = {
		title: title,
		endsAt: endsAt,
		description: description,
		media: media,
		tags: tags,
	};

	try {
		const response = await fetch(API_URLS.LISTINGS, {
			method: "POST",
			body: JSON.stringify(listing),
			headers: headers("application/json", true),
		});

		if (response.ok) {
			alert(
				"success",
				"Listing successfully posted!",
				".alert-create-listing",
				3000,
				false
			);

			const json = await response.json();

			return json.data;
		} else {
			const json = await response.json();

			alert("danger", `${json.errors[0].message}`, null);
		}
	} catch (error) {
		alert(
			"danger",
			"An error occured when attempting to create listing",
			".alert-create-listing",
			null
		);
		throw new Error(
			`An error occured when attempting to create listing: ${error}`
		);
	}
}
