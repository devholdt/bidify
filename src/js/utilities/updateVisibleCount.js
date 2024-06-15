export function updateVisibleCount(activeElement, parentElement) {
	const activeSpan = document.querySelector(activeElement);
	const totalSpan = document.querySelector(`${parentElement}-count`);
	const container = document.querySelector(parentElement);

	if (!container) return;

	const visibleElements = container.querySelectorAll(
		":scope > tr:not(.d-none), :scope > div:not(.d-none)"
	);
	const totalElements = container.querySelectorAll(":scope > tr, :scope > div");

	activeSpan.textContent = visibleElements.length;
	totalSpan.textContent = totalElements.length;
}
