import { API_URLS, cachedFetch, headers } from "../index.js";

/**
 * Fetches profile information for a specified user based on the endpoint type.
 *
 * @param {string} name - The name of the user whose profile data is to be fetched.
 * @param {string} type - The type of endpoint to use ('user', 'listings', 'bids', or 'wins').
 * @returns {Promise<object>} A promise that resolves to the profile information of the user.
 */
export async function getProfileData(name, type) {
	let endpoint;

	switch (type) {
		case "user":
			endpoint = `${name}?_listings=true&_wins=true`;
			break;
		case "listings":
			endpoint = `${name}/listings?_bids=true&_seller=true`;
			break;
		case "bids":
			endpoint = `${name}/bids?_listings=true`;
			break;
		case "wins":
			endpoint = `${name}/wins?_listings=true&_bids=true&_seller=true`;
			break;
		default:
			throw new Error(`Invalid endpoint type: ${type}`);
	}

	return await cachedFetch(`${API_URLS.PROFILES}/${endpoint}`, {
		headers: headers(null, true),
	});
}
