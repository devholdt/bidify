import { APIv2_URLS, headers } from "../api/index.js";

/**
 * Handles the event for deleting a listing.
 *
 * @param {Event} event - The event object associated with the delete action.
 * @throws {Error} Throws an error if the deletion fails.
 */
export async function deleteListingEvent(event) {
	let targetElement = event.target;

	if (
		targetElement.tagName === "SPAN" &&
		targetElement.parentElement.classList.contains("btn")
	) {
		targetElement = targetElement.parentElement;
	}

	const id = targetElement.dataset.id;

	if (confirm("Are you sure you want to delete this listing?") === true) {
		try {
			const response = await fetch(`${APIv2_URLS.LISTINGS}/${id}`, {
				method: "DELETE",
				headers: headers("application/json"),
			});

			if (response.ok) {
				location.reload();
			}
		} catch (error) {
			alert(
				"danger",
				"An error occured when attempting to delete listing",
				".alert-absolute",
				null
			);
			throw new Error(
				`An error occured when attempting to delete listing: ${error}`
			);
		}
	}
}
