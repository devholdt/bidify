export function setCache(key, data) {
  const item = {
    value: data,
    expiry: new Date().getTime() + 300000,
  };
  sessionStorage.setItem(key, JSON.stringify(item));
}
