import { setCache, getCache } from "../storage/index.js";

export async function cachedFetch(url, options) {
  const key = JSON.stringify({ url, options });
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
