import { API_URLS, headers, cachedFetch } from "../index.js";

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

export async function getSingleListing(id) {
  return await cachedFetch(
    `${API_URLS.LISTINGS}/${id}?_seller=true&_bids=true`,
    {
      headers: headers(),
    }
  );
}
