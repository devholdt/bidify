import { API_URLS, headers, cachedFetch } from "../index.js";

/**
 * Fetches listing data from the API.
 *
 * @param {string} type - The type of listing data to fetch ('all' or 'single').
 * @param {object} params - Parameters for the API request.
 * @param {string} params.id - The unique identifier of the listing (required for 'single' type).
 * @param {string} params.sortOrder - The order in which to sort the listings (asc/desc).
 * @param {string} params.sort - Additional sorting criteria.
 * @param {string} params.limit - The limit for the number of listings to fetch (max. 100).
 * @param {string} params.offset - The offset for listing fetching.
 * @param {string} params.tag - Filter listings by a specific tag.
 * @returns {Promise<object>} - A promise that resolves to the fetched listing data.
 */
export async function getListingData(
	type,
	params = {
		sortOrder: "desc",
		sort: "created",
		limit: "",
		offset: "",
		tag: "",
	}
) {
	let endpoint;

	if (type === "single") {
		if (!params.id) {
			throw new Error("ID is required for fetching a single listing");
		}
		endpoint = `${API_URLS.LISTINGS}/${params.id}?_seller=true&_bids=true`;
	} else if (type === "all") {
		const {
			sortOrder = "desc",
			sort = "",
			limit = "",
			offset = "",
			tag = "",
		} = params;
		endpoint = `${
			API_URLS.LISTINGS
		}?_seller=true&_bids=true&_active=true&sortOrder=${sortOrder}${
			sort ? `&sort=${sort}` : ""
		}${limit ? `&limit=${limit}` : ""}${offset ? `&offset=${offset}` : ""}${
			tag ? `&tag=${tag}` : ""
		}`;
	} else {
		throw new Error(`Invalid type: ${type}`);
	}

	return await cachedFetch(endpoint, {
		headers: headers(),
	});
}
