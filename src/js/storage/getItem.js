export function getItem(key) {
  const storedItem = localStorage.getItem(key);

  return JSON.parse(storedItem);
}

export function getCachedItem(key) {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date().getTime();

  if (now > item.expiry) {
    sessionStorage.removeItem(key);
    return null;
  }

  return item.value;
}
