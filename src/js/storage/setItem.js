export function setItem(obj) {
  localStorage.setItem(obj.key, JSON.stringify(obj.value));
}
