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
