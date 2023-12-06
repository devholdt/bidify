import { DEFAULT_URLS, URLS } from "./index.js";
import { getItem, getUser } from "../storage/index.js";
import { API_URLS, headers } from "../api/index.js";
import { logoutUser } from "../auth/logout.js";
import { alert } from "../utilities/index.js";
import {
  updateUserInfo,
  updateNavLinks,
  setupNav,
} from "../utilities/setupNav.js";

export async function renderNav() {
  const userInfoHeader = document.querySelector(".user-info-header");
  const userInfoCollapse = document.querySelector(".user-info-collapse");
  const navLinks = document.querySelector(".nav-links");
  const navButtons = document.querySelector(".nav-buttons");
  const navLinksCollapse = document.querySelector(".nav-links-collapse");

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

        updateUserInfo(userInfoHeader, userInfoCollapse, userDataApi);

        window.addEventListener("resize", () => {
          updateUserInfo(userInfoHeader, userInfoCollapse, userDataApi);
        });

        const logoutButton = document.getElementById("logoutButton");
        logoutButton.addEventListener("click", logoutUser);

        links.push(linkProfile);
      }
    }

    setupNav(navButtons, navLinks, navLinksCollapse, links);

    window.addEventListener("resize", () => {
      if (screen.width < 992) {
        updateNavLinks(navLinksCollapse, links);
      } else {
        navLinksCollapse.innerHTML = "";
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

    console.error(error);
  }
}
