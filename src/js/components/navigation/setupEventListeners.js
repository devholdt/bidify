import {
  handleNavListingClick,
  handleWindowLoad,
  handleWindowResize,
} from "./index.js";

export function setupEventListeners(elements, links) {
  document
    .querySelector(".nav-listing")
    .addEventListener("click", handleNavListingClick);
  window.onload = handleWindowLoad;
  window.addEventListener("resize", () => handleWindowResize(elements, links));
}
