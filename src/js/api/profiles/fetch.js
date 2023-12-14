import { API_URLS, headers, cachedFetch } from "../index.js";

export async function getProfile(name, bids = false) {
  const endpoint = bids ? `${name}/bids` : `${name}`;
  return cachedFetch(`${API_URLS.PROFILES}/${endpoint}?_listings=true`, {
    headers: headers(),
  });
}

export function getProfileListings(name) {
  return cachedFetch(
    `${API_URLS.PROFILES}/${name}/listings?_bids=true&_seller=true`,
    { headers: headers() }
  );
}
