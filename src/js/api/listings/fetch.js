import { API_PATH } from "../constants.js";
import { headers } from "../headers.js";

export async function getListings(limit = 12, offset = 0) {
  const response = await fetch(
    `${API_PATH}/auction/listings?limit=${limit}&offset=${offset}&_seller=true&_bids=true`,
    { headers: headers() }
  );
  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}

export async function getListing(id) {
  const response = await fetch(
    `${API_PATH}/auction/listings/${id}?_seller=true&_bids=true`,
    { headers: headers() }
  );
  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
