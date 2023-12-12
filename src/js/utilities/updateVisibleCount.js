export function updateVisibleCount(activeElement, parentElement) {
  const activeSpan = document.querySelector(activeElement);
  const count = countElementsWithoutClass(parentElement);
  activeSpan.textContent = `${count}`;
}

function countElementsWithoutClass(parentElement) {
  const container = document.querySelector(parentElement);
  if (!container) return 0;

  const elementsWithoutClass = container.querySelectorAll(
    `:scope > :not(.d-none)`
  );
  return elementsWithoutClass.length;
}
