import { getItem } from "../../storage/index.js";
import { updateNavLinks } from "../../utilities/index.js";
import { loginButtonHTML } from "./index.js";
import { WIDTH } from "../index.js";

export function handleWindowLoad() {
  const scrollRequired = getItem("scrollRequired");
  if (scrollRequired === "true") {
    setTimeout(() => {
      document.querySelector(".listing-sorting").scrollIntoView();
      localStorage.removeItem("scrollRequired");
    }, 100);
  }
}

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
