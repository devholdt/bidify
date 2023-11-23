import { API_PATH } from "../constants.js";
import { headers } from "../headers.js";

export async function getProfiles() {
  const response = await fetch(`${API_PATH}/auction/profiles?_listings=true`, {
    headers: headers(),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}

export async function getProfile(name, bids = false) {
  const endpoint = bids
    ? `/auction/profiles/${name}/bids`
    : `/auction/profiles/${name}`;

  const url = `${API_PATH}${endpoint}?_listings=true`;

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
