import { getListings } from "./listings/index.js";
import { setCachedItem, getCachedItem } from "../storage/index.js";
import { alert } from "../utilities/index.js";

const listingsCache = {
	data: null,
	timeStamp: null,
	cacheDuration: 3000,
};

/**
 * Performs a fetch request with caching capability. It can use either a general cache
 * or a specialized listings cache based on the provided parameters. The function retrieves
 * data from the cache if available and not expired. Otherwise, it performs a fetch request.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {object} options - The options to pass to the fetch request, similar to the fetch API options.
 * @param {boolean} [useListingsCache=false] - Determines whether to use the specialized listings cache.
 * @returns {Promise<any>} - A promise that resolves with the fetched data.
 * @throws {Error} - Throws an error if the fetch request fails or if the response status is not successful.
 *
 * @example
 * // To fetch data with general caching:
 * cachedFetch("https://api.example.com/data", { method: "GET" })
 *   .then(data => console.log(data))
 *   .catch(error => throw new Error(error));
 *
 * // To fetch listings with specialized listings caching:
 * cachedFetch("https://api.example.com/listings", { method: "GET" }, true)
 *   .then(listings => console.log(listings))
 *   .catch(error => throw new Error(error));
 */
export async function cachedFetch(url, options, useListingsCache = false) {
	const key = JSON.stringify({ url, options });

	if (useListingsCache) {
		const now = new Date().getTime();
		if (
			listingsCache.data &&
			now - listingsCache.timestamp < listingsCache.cacheDuration
		) {
			return listingsCache.data;
		}

		const listings = await getListings({ sort: "&sort=created" });
		listingsCache.data = listings;
		listingsCache.timestamp = now;

		return listings;
	}

	const cachedData = getCachedItem(key);
	if (cachedData) {
		return cachedData;
	}

	try {
		const response = await fetch(url, options);
		const json = await response.json();
		const data = json.data;

		if (response.ok) {
			setCachedItem(key, data);
			return data;
		}
	} catch (error) {
		alert(
			"danger",
			"An error occured when attempting to make a cached fetch",
			".alert-absolute",
			null
		);
		throw new Error(
			`An error occured when attempting to make a cached fetch: ${error}`
		);
	}
}
