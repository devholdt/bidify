import { API_URLS, headers } from "../index.js";
import { alert } from "../../utilities/index.js";

/**
 * Edits an existing listing with new details.
 *
 * @param {string} id - The unique ID of the listing to be edited.
 * @param {string} title - The new title of the listing.
 * @param {string} description - The new description of the listing.
 * @param {string[]} media - An array of new media URLs for the listing.
 * @param {string[]} tags - An array of new tags relevant to the listing.
 * @returns {Promise<object>} - A promise that resolves to the response of the edit listing request.
 * @throws {Error} - Throws an error if the listing edit fails.
 */
export async function editListing(id, title, description, media, tags) {
	const editedListing = {
		title: title,
		description: description,
		media: media,
		tags: tags,
	};

	try {
		const response = await fetch(`${API_URLS.LISTINGS}/${id}`, {
			method: "PUT",
			body: JSON.stringify(editedListing),
			headers: headers("application/json", true),
		});

		if (response.ok) {
			alert(
				"success",
				"Listing successfully edited",
				".alert-absolute",
				3000,
				false
			);

			// setTimeout(() => {
			// 	location.reload();
			// }, 3000);

			const json = await response.json();

			return json.data;
		}
	} catch (error) {
		alert(
			"danger",
			"An error occured when attempting to edit listing",
			".alert-absolute",
			null
		);
		throw new Error(
			`An error occured when attempting to edit listing: ${error}`
		);
	}
}
