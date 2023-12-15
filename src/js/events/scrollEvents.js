/**
 * Controls the visibility of a specified element based on the window scroll position.
 *
 * @param {string} target - The CSS selector of the target element.
 * @param {string} display - The display class to toggle for the element.
 * @param {number} scrollY - The Y scroll position at which the element's visibility should change.
 */
export function elementVisibility(target, display, scrollY) {
  const element = document.querySelector(target);

  window.addEventListener("scroll", () => {
    if (window.scrollY >= scrollY) {
      element.classList.remove("d-none");
      element.classList.add(display);
    } else {
      element.classList.remove(display);
      element.classList.add("d-none");
    }
  });
}
