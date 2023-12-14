import { API_URLS, headers, cachedFetch } from "../index.js";

export function getListings({
  sortOrder = "desc",
  sort = "",
  limit = "",
  offset = "",
  tag = "",
} = {}) {
  return cachedFetch(
    `${API_URLS.LISTINGS}?_seller=true&_bids=true&_active=true&sortOrder=${sortOrder}${sort}${limit}${offset}${tag}`,
    { headers: headers() }
  );
}

export function getSingleListing(id) {
  return cachedFetch(`${API_URLS.LISTINGS}/${id}?_seller=true&_bids=true`, {
    headers: headers(),
  });
}

// export async function getListings({
//   sortOrder = "desc",
//   sort = "",
//   limit = "",
//   offset = "",
//   tag = "",
// } = {}) {
//   const response = await fetch(
//     `${API_URLS.LISTINGS}?_seller=true&_bids=true&_active=true&sortOrder=${sortOrder}${sort}${limit}${offset}${tag}`,
//     { headers: headers() }
//   );
//   if (response.ok) {
//     return await response.json();
//   } else {
//     const errorBody = await response.json();
//     throw new Error(`Error: ${response.status} - ${errorBody.message}`);
//   }
// }

// export async function getSingleListing(id) {
//   const response = await fetch(
//     `${API_URLS.LISTINGS}/${id}?_seller=true&_bids=true`,
//     { headers: headers() }
//   );
//   if (response.ok) {
//     return await response.json();
//   } else {
//     const errorBody = await response.json();
//     throw new Error(`Error: ${response.status} - ${errorBody.message}`);
//   }
// }
