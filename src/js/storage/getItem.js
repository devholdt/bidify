export function getItem(key) {
  const storedItem = localStorage.getItem(key);

  return JSON.parse(storedItem);
}
