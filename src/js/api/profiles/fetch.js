import { APIv2_URLS, headers, cachedFetch } from "../index.js";

/**
 * Fetches profile information for a specified user.
 *
 * @param {string} name - The name of the user whose profile is to be fetched.
 * @param {boolean} [bids=false] - Indicates whether to fetch bid information along with the profile.
 * @returns {Promise<object>} A promise that resolves to the profile information of the user.
 */
export async function getProfile(name, bids = false) {
	const endpoint = bids ? `${name}/bids` : `${name}`;
	return await cachedFetch(
		`${APIv2_URLS.PROFILES}/${endpoint}?_listings=true`,
		{
			headers: headers(),
		}
	);
}

/**
 * Fetches listings associated with a specific user's profile.
 *
 * @param {string} name - The name of the user whose listings are to be fetched.
 * @returns {Promise<Array>} A promise that resolves to an array of listings associated with the user.
 */
export async function getProfileListings(name) {
	return await cachedFetch(
		`${APIv2_URLS.PROFILES}/${name}/listings?_bids=true&_seller=true`,
		{ headers: headers() }
	);
}
