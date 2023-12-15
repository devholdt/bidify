import { getItem } from "../../storage/index.js";
import { updateNavLinks } from "../../utilities/index.js";
import { loginButtonHTML } from "./index.js";
import { WIDTH } from "../index.js";

/**
 * Sets up a 'load' event listener on the window to handle post-load actions.
 */
export function handleWindowLoad() {
  window.addEventListener("load", () => {
    const scrollRequired = getItem("scrollRequired");
    if (scrollRequired === "true") {
      setTimeout(() => {
        document.querySelector(".listing-sorting").scrollIntoView();
        localStorage.removeItem("scrollRequired");
      }, 500);
    }
  });
}

/**
 * Adjusts navigation and UI elements based on window resize events.
 *
 * @param {HTMLElement[]} elements - A collection of UI elements to be adjusted.
 * @param {object[]} links - Navigation links to update based on resize.
 */
export function handleWindowResize(elements, links) {
  const isMobile = window.innerWidth < WIDTH.MEDIUM;
  const isLoggedIn = getItem("name");

  updateNavLinks(elements, links, isMobile);

  if (isMobile && !isLoggedIn) {
    elements.userInfoCollapse.innerHTML = loginButtonHTML();
  } else if (!isMobile && !isLoggedIn) {
    elements.userInfoCollapse.innerHTML = "";
  }
}
