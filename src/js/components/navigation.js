import { DEFAULT_URLS, URLS } from "./index.js";
import { getItem, getUser } from "../storage/index.js";
import { API_URLS, headers } from "../api/index.js";
import { logoutUser } from "../auth/logout.js";
import { alert } from "../utilities/index.js";
import {
  updateUserHeader,
  updateNavLinks,
  updateNavButtons,
  setupNav,
} from "../utilities/setupNav.js";

export async function renderNav() {
  const userInfoHeader = document.querySelector(".user-info-header");
  const navLinks = document.querySelector(".nav-links");
  const navButtons = document.querySelector(".nav-buttons");
  const navLinksCollapse = document.querySelector(".nav-links-collapse");
  const navButtonsCollapse = document.querySelector(".nav-buttons-collapse");
  const bannerButtons = document.querySelector(".banner-buttons");

  const links = [];
  const linkHome = { href: URLS.INDEX, text: "Home" };

  links.push(linkHome);

  try {
    if (getItem("name")) {
      const linkProfile = {
        href: `${URLS.PROFILE}?name=${getUser().name}`,
        text: "Profile",
      };
      const userDataLocal = getItem("user");
      const userUrl = `${API_URLS.PROFILES}/${userDataLocal.name}?_listings=true`;

      const response = await fetch(`${userUrl}`, { headers: headers() });
      const userDataApi = await response.json();

      if (response.ok) {
        if (userDataApi.avatar === null) {
          userDataApi.avatar = DEFAULT_URLS.AVATAR;
        }

        updateUserHeader(userInfoHeader, userDataApi);

        const logoutButton = document.getElementById("logoutButton");
        logoutButton.addEventListener("click", logoutUser);

        links.push(linkProfile);
      }
    }

    setupNav(navButtons, navLinks, navButtonsCollapse, navLinksCollapse, links);

    window.addEventListener("resize", () => {
      if (screen.width < 992) {
        updateNavLinks(navLinksCollapse, links);
        updateNavButtons(getItem("name"), navButtonsCollapse, bannerButtons);
      } else {
        navLinksCollapse.innerHTML = "";
        navButtonsCollapse.innerHTML = "";
      }
    });
  } catch (error) {
    alert(
      "danger",
      "An error occured when attempting to render navigation menu",
      ".alert-absolute",
      null,
      false
    );

    console.log(error);
  }
}
