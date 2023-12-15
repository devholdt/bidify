import {
  handleNavListingClick,
  handleWindowLoad,
  handleWindowResize,
} from "./index.js";

/**
 * Sets up event listeners for various elements in the navigation menu.
 *
 * @param {HTMLElement[]} elements - A collection of UI elements for which event listeners are to be set.
 * @param {object[]} links - A collection of navigation links used in event handling.
 */
export function setupEventListeners(elements, links) {
  document
    .querySelector(".nav-listing")
    .addEventListener("click", handleNavListingClick);
  window.onload = handleWindowLoad;
  window.addEventListener("resize", () => handleWindowResize(elements, links));
}
