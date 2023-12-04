export function setQueryString(key, value) {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  params.set(key, value);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, "", newUrl);
}

export function removeQueryString(key) {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  window.history.pushState({}, "", url.pathname + url.search);
}
