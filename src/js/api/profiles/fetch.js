import { API_URLS, headers, cachedFetch } from "../index.js";
// import { alert } from "../../utilities/index.js";

export async function getProfiles() {
  return cachedFetch(`${API_URLS.PROFILES}?_listings=true`, {
    headers: headers(),
  });
}

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

// export async function getProfiles() {
//   const response = await fetch(`${API_URLS.PROFILES}?_listings=true`, {
//     headers: headers(),
//   });

//   if (response.ok) {
//     return await response.json();
//   }

//   throw new Error(response.statusText);
// }

// export async function getProfile(name, bids = false) {
//   const endpoint = bids ? `${name}/bids` : `${name}`;

//   const url = `${API_URLS.PROFILES}/${endpoint}?_listings=true`;

//   try {
//     const response = await fetch(url, { headers: headers() });

//     if (response.ok) {
//       return await response.json();
//     }

//     throw new Error(response.statusText);
//   } catch {
//     alert(
//       "danger",
//       "An error occured when fetching profile",
//       ".alert-absolute",
//       null
//     );
//   }
// }

// export async function getProfileListings(name) {
//   const url = `${API_URLS.PROFILES}/${name}/listings?_bids=true&_seller=true`;

//   try {
//     const response = await fetch(url, { headers: headers() });

//     if (response.ok) {
//       return await response.json();
//     }

//     throw new Error(response.statusText);
//   } catch {
//     alert(
//       "danger",
//       "An error occured when fetching profile listings",
//       ".alert-absolute",
//       null
//     );
//   }
// }
