import { getListings } from "./listings/index.js";
import { setCachedItem, getCachedItem } from "../storage/index.js";
import { alert } from "../utilities/index.js";

const listingsCache = {
  data: null,
  timeStamp: null,
  cacheDuration: 3000,
};

/**
 * Performs a fetch request with caching capability.
 *  It can use a general cache or a specific listings
 *  cache based on the provided parameters.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {object} options - The options to pass to the fetch request.
 * @param {boolean} useListingsCache - Determines to use specialized listings cache or not.
 * @returns {Promise<any>} - A promise that resolves with the fetched data.
 * @throws {Error} - Throws an error if the fetch request fails.
 *
 * @example
 * // To fetch data with general caching:
 * cachedFetch("https://api.example.com/data", { method: "GET" })
 *  .then(data => console.log(data))
 *  .catch(error => throw new Error(error));
 *
 * // To fetch listings with specialized listings caching:
 * cachedFetch("https://api.example.com/listings", { method: "GET" }, true)
 *  .then(listings => console.log(listings))
 *  .catch(error => throw new Error(error));
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
    const data = await response.json();

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
    throw new Error(`Error: ${response.status} - ${data.message}`);
  }
}
