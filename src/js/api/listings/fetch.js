import { API_URLS, headers } from "../index.js";

export async function getListings({
  sortOrder = "desc",
  sort = "",
  limit = "",
  offset = "",
  tag = "",
} = {}) {
  const response = await fetch(
    `${API_URLS.LISTINGS}?_seller=true&_bids=true&_active=true&sortOrder=${sortOrder}${sort}${limit}${offset}${tag}`,
    { headers: headers() }
  );
  if (response.ok) {
    return await response.json();
  } else {
    const errorBody = await response.json();
    throw new Error(`Error: ${response.status} - ${errorBody.message}`);
  }
}

export async function getSingleListing(id) {
  const response = await fetch(
    `${API_URLS.LISTINGS}/${id}?_seller=true&_bids=true`,
    { headers: headers() }
  );
  if (response.ok) {
    return await response.json();
  } else {
    const errorBody = await response.json();
    throw new Error(`Error: ${response.status} - ${errorBody.message}`);
  }
}
