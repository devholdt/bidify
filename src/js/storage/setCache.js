export function setCache(key, data) {
  const item = {
    value: data,
    expiry: new Date().getTime() + 10000,
  };
  sessionStorage.setItem(key, JSON.stringify(item));
}
