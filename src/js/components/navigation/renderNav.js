import {
  getElements,
  handleLoggedInUser,
  handleLoggedOutUser,
  setupEventListeners,
} from "./index.js";
import { setupNav, alert } from "../../utilities/index.js";
import { getItem } from "../../storage/index.js";
import { URLS } from "../index.js";

export async function renderNav() {
  const elements = getElements();
  const isLoggedIn = getItem("name");
  const links = [{ href: URLS.INDEX, parameter: "", text: "Home" }];

  if (isLoggedIn) {
    links.push({
      href: URLS.PROFILE,
      parameter: `?name=${getItem("name")}`,
      text: "Profile",
    });
  }

  try {
    setupNav(elements, links);

    if (getItem("name")) {
      await handleLoggedInUser(elements, links);
    } else {
      handleLoggedOutUser(elements);
    }

    setupEventListeners(elements, links);
  } catch (error) {
    alert(
      "danger",
      "An error occurred when attempting to render navigation menu",
      ".alert-absolute",
      null,
      false
    );

    console.log("renderNav.js: ");
    console.error(error);
  }
}
