/**
 * Updates the visible count and total count of elements within a container.
 *
 * @param {string} activeSelector - The CSS selector for the active span element.
 * @param {string} containerSelector - The CSS selector for the container element.
 * @return {void} This function does not return anything.
 */
export function updateVisibleCount(activeSelector, containerSelector) {
	const activeSpan = document.querySelector(activeSelector);
	const totalSpan = document.querySelector(`${containerSelector}-count`);
	const container = document.querySelector(containerSelector);

	if (!container) return;

	const visibleElements = container.querySelectorAll(":scope > :not(.d-none)");
	const totalElements = container.querySelectorAll(":scope > *");

	activeSpan.textContent = visibleElements.length;
	totalSpan.textContent = totalElements.length;
}
