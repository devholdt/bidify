export function getCache(key) {
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
