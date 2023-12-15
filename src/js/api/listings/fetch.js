import { API_URLS, headers, cachedFetch } from "../index.js";

/**
 * Fetches listings from the API with the specified query parameters.
 *
 * @param {object} params - Query parameters for the listings API.
 * @param {string} params.sortOrder - The order in which to sort the listings (asc/desc).
 * @param {string} params.sort - Additional sorting criteria.
 * @param {string} params.limit - The limit for the number of listings to fetch (max. 100).
 * @param {string} params.offset - The offset for listing fetching.
 * @param {string} params.tag - Filter listings by a specific tag.
 * @returns {Promise<object>} - A promise that resolves to the fetched listings.
 */
export async function getListings({
  sortOrder = "desc",
  sort = "",
  limit = "",
  offset = "",
  tag = "",
} = {}) {
  return await cachedFetch(
    `${API_URLS.LISTINGS}?_seller=true&_bids=true&_active=true&sortOrder=${sortOrder}${sort}${limit}${offset}${tag}`,
    { headers: headers() }
  );
}

/**
 * Fetches details of a single listing by its ID.
 *
 * @param {string} id - The unique identifier of the listing.
 * @returns {Promise<object>} - A promise that resolves to the details of the listing.
 */
export async function getSingleListing(id) {
  return await cachedFetch(
    `${API_URLS.LISTINGS}/${id}?_seller=true&_bids=true`,
    {
      headers: headers(),
    }
  );
}
