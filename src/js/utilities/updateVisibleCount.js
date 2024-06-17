/**
 * Updates the count of visible elements in a container, excluding those with a specific class.
 *
 * @param {string} activeElement - The selector for the element displaying the count.
 * @param {string} parentElement - The selector for the parent container of the elements to count.
 */
export function updateVisibleCount(activeElement, parentElement) {
	const activeSpan = document.querySelector(activeElement);
	const count = countElementsWithoutClass(parentElement);
	activeSpan.textContent = `${count}`;
}

/**
 * Counts the number of child elements within a container that do not have a specified class.
 *
 * @param {string} parentElement - The selector for the parent container.
 * @returns {number} The count of elements without the specified class.
 */
function countElementsWithoutClass(parentElement) {
	const container = document.querySelector(parentElement);
	if (!container) return 0;

	const elementsWithoutClass = container.querySelectorAll(
		`:scope > :not(.d-none)`
	);
	return elementsWithoutClass.length;
}
