import { getListings } from "./listings/index.js";
import { setCache, getCache } from "../storage/index.js";

export async function cachedFetch(url, options, useListingsCache = false) {
  const key = JSON.stringify({ url, options });

  if (useListingsCache) {
    const listingsCache = {
      data: null,
      timeStamp: null,
      cacheDuration: 300000,
    };

    const now = new Date().getTime();
    if (
      listingsCache.data &&
      now - listingsCache.timestamp < listingsCache.cacheDuration
    ) {
      return listingsCache.data;
    }

    const listings = await getListings({ sort: "&sort=created" });
    listingsCache.data = listings;
    listingsCache.timestamp = now;

    return listings;
  }

  const cachedData = getCache(key);
  if (cachedData) {
    return cachedData;
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (response.ok) {
    setCache(key, data);
    return data;
  } else {
    throw new Error(`Error: ${response.status} - ${data.message}`);
  }
}
