const cache = {};

export async function cachedFetch(url, options, cacheDuration = 300000) {
  const key = JSON.stringify({ url, options });
  const now = new Date().getTime();

  if (cache[key] && now - cache[key].timestamp < cacheDuration) {
    return cache[key].data;
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (response.ok) {
    cache[key] = { data, timestamp: now };
    return data;
  } else {
    throw new Error(`Error: ${response.status} - ${data.message}`);
  }
}
