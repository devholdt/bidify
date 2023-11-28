import { API_URLS } from "../constants.js";
import { headers } from "../headers.js";

export async function getListings({ sortOrder = "desc", sort = "" } = {}) {
  const response = await fetch(
    `${API_URLS.LISTINGS}?sortOrder=${sortOrder}${sort}&_seller=true&_bids=true&_active=true`,
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
