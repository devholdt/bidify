/**
 * Updates the URL's query string by setting a key-value pair.
 *
 * @param {string} key - The query string key to set or update.
 * @param {string} value - The value associated with the key.
 */
export function setQueryString(key, value) {
	const queryString = document.location.search;
	const params = new URLSearchParams(queryString);

	params.set(key, value);

	const newUrl = `${window.location.pathname}?${params.toString()}`;

	window.history.pushState({}, "", newUrl);
}

/**
 * Removes a key from the URL's query string.
 *
 * @param {string} key - The query string key to remove.
 */
export function removeQueryString(key) {
	const url = new URL(window.location.href);
	url.searchParams.delete(key);
	window.history.pushState({}, "", url.pathname + url.search);
}
