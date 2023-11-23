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

export async function getProfile(name) {
  const response = await fetch(
    `${API_PATH}/auction/profile/${name}?_listings=true`,
    { headers: headers() }
  );

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
