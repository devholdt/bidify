import { DEFAULT_URLS, URLS } from "./index.js";
import { setItem, getItem, getUser } from "../storage/index.js";
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
  const bannerButtons = document.querySelector(".banner-buttons");

  const links = [];
  const linkHome = { href: URLS.INDEX, text: "Home" };

  links.push(linkHome);

  try {
    setupNav(navButtons, bannerButtons, navLinks, navLinksCollapse, links);

    if (getItem("name")) {
      const linkProfile = {
        href: `${URLS.PROFILE}?name=${getUser().name}`,
        text: "Profile",
      };
      const userDataLocal = getItem("user");
      const userUrl = `${API_URLS.PROFILES}/${userDataLocal.name}?_listings=true`;

      const response = await fetch(`${userUrl}`, { headers: headers() });
      const userDataApi = await response.json();

      if (bannerButtons) {
        document
          .querySelector(".banner-listings-button")
          .addEventListener("click", () => {
            document.querySelector(".listing-sorting").scrollIntoView();
          });
      }

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
        setupNav(navButtons, bannerButtons, navLinks, navLinksCollapse, links);
      }
    }

    document.querySelector(".nav-listing").addEventListener("click", () => {
      if (location.pathname === "/index.html") {
        document.querySelector(".listing-sorting").scrollIntoView();
      } else if (location.pathname === "/profile.html") {
        location.href = "index.html";

        setItem({ key: "scrollRequired", value: "true" });
      }
    });

    window.onload = function () {
      const scrollRequired = getItem("scrollRequired");

      setTimeout(() => {
        if (scrollRequired === "true") {
          document.querySelector(".listing-sorting").scrollIntoView();
          localStorage.removeItem("scrollRequired");
        }
      }, 100);
    };

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
