/**
 * Updates the text content of two spans with the number of visible and total elements in a container.
 *
 * @param {string} activeElement - A CSS selector for the span to be updated with the number of visible elements.
 * @param {string} parentElement - A CSS selector for the container of the elements to be counted.
 * @return {void} This function does not return anything.
 */
export function updateVisibleCount(activeElement, parentElement) {
	const activeSpan = document.querySelector(activeElement);
	const totalSpan = document.querySelector(`${parentElement}-count`);
	const container = document.querySelector(parentElement);

	if (!container) return;

	const visibleElements = container.querySelectorAll(
		":scope > tr:not(.d-none)"
	);
	const totalElements = container.querySelectorAll(":scope > tr");

	activeSpan.textContent = visibleElements.length;
	totalSpan.textContent = totalElements.length;
}

/**
 * Returns the number of elements in a container that do not have a specific class.
 *
 * @param {string} parentElement - A CSS selector for the container of the elements to be counted.
 * @return {number} The number of elements in the container that do not have the class 'd-none'.
 */
function countElementsWithoutClass(parentElement) {
	const container = document.querySelector(parentElement);
	if (!container) return 0;

	const elementsWithoutClass = container.querySelectorAll(
		":scope > :not(.d-none)"
	);
	return elementsWithoutClass.length;
}
