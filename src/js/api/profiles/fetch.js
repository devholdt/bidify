import { API_URLS } from "../index.js";
import { headers } from "../index.js";

export async function getProfiles() {
  const response = await fetch(`${API_URLS.PROFILES}?_listings=true`, {
    headers: headers(),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}

export async function getProfile(name, bids = false) {
  const endpoint = bids ? `${name}/bids` : `${name}`;

  const url = `${API_URLS.PROFILES}/${endpoint}?_listings=true`;

  try {
    const response = await fetch(url, { headers: headers() });

    if (response.ok) {
      return await response.json();
    }

    throw new Error(response.statusText);
  } catch (error) {
    console.error(`Error fetching profile: `, error);
    throw error;
  }
}
