export function setItem(obj) {
  localStorage.setItem(obj.key, JSON.stringify(obj.value));
}

export function setCachedItem(key, data) {
  const item = {
    value: data,
    expiry: new Date().getTime() + 3000,
  };
  sessionStorage.setItem(key, JSON.stringify(item));
}
