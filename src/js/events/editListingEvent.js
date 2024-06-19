import { editListing } from "../api/index.js";
import { alert, collectInputValues } from "../utilities/index.js";

/**
 * Handles the event for editing a listing.
 *
 * @param {Event} event - The event object associated with the listing edit action.
 * @throws {Error} Throws an error if the listing edit fails.
 */
export async function editListingEvent(event) {
	event.preventDefault();

	const url = new URL(location.href);
	const params = new URLSearchParams(url.search);
	const id = params.get("id");

	const titleInput = document.querySelector("#editListingTitle");
	const descriptionInput = document.querySelector("#editListingDescription");
	const mediaValues = collectInputValues("editMediaInputsContainer");
	const tagValues = collectInputValues("editTagInputsContainer");

	const media = Array.from(mediaValues)
		.filter((value) => value.trim() !== "")
		.map((value) => ({
			url: value,
			alt: "Alt text",
		}));

	try {
		const response = await editListing(
			id,
			titleInput.value,
			descriptionInput.value,
			media,
			tagValues
		);

		return response;
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
