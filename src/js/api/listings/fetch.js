import { API_URLS } from "../constants.js";
import { headers } from "../headers.js";

export async function getListings({
  sortOrder = "desc",
  sort = "",
  limit = "",
  offset = "",
} = {}) {
  const response = await fetch(
    `${API_URLS.LISTINGS}?_seller=true&_bids=true&_active=true&sortOrder=${sortOrder}${sort}${limit}${offset}`,
    { headers: headers() }
  );
  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}

export async function getListing(id) {
  const response = await fetch(
    `${API_URLS.LISTINGS}/${id}?_seller=true&_bids=true`,
    { headers: headers() }
  );
  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
