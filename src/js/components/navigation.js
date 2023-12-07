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
  const elements = getElements();
  const links = [];
  const linkHome = { href: URLS.INDEX, text: "Home" };

  links.push(linkHome);

  try {
    setupNav(elements, links);
    setupEventListeners(elements, links);

    if (getItem("name")) {
      await handleLoggedInUser(elements, links);
    } else {
      handleLoggedOutUser(elements);
    }
  } catch (error) {
    alert(
      "danger",
      "An error occurred when attempting to render navigation menu",
      ".alert-absolute",
      null,
      false
    );

    console.error(error);
  }
}

function getElements() {
  return {
    userInfoHeader: document.querySelector(".user-info-header"),
    userInfoCollapse: document.querySelector(".user-info-collapse"),
    navLinks: document.querySelector(".nav-links"),
    navButtons: document.querySelector(".nav-buttons"),
    navLinksCollapse: document.querySelector(".nav-links-collapse"),
    bannerButtons: document.querySelector(".banner-buttons"),
  };
}

function setupEventListeners(elements, links) {
  document
    .querySelector(".nav-listing")
    .addEventListener("click", handleNavListingClick);
  window.onload = handleWindowLoad;
  window.addEventListener("resize", () => handleWindowResize(elements, links));
}

function handleNavListingClick() {
  const currentPath = location.pathname;
  if (currentPath === "/index.html") {
    document.querySelector(".listing-sorting").scrollIntoView();
  } else if (currentPath === "/profile.html") {
    location.href = "index.html";
    setItem({ key: "scrollRequired", value: "true" });
  }
}

function handleWindowLoad() {
  const scrollRequired = getItem("scrollRequired");
  if (scrollRequired === "true") {
    setTimeout(() => {
      document.querySelector(".listing-sorting").scrollIntoView();
      localStorage.removeItem("scrollRequired");
    }, 100);
  }
}

function handleWindowResize(elements, links) {
  const isMobile = screen.width < 992;
  updateNavLinks(elements.navLinksCollapse, links, isMobile);
  if (isMobile) {
    elements.userInfoCollapse.innerHTML = loginButtonHTML();
  } else {
    elements.userInfoCollapse.innerHTML = "";
  }
}

function loginButtonHTML() {
  return `
    <button type="button"
      class="btn btn-outline-primary rounded-1 text-uppercase d-flex ms-auto px-4 shadow-sm" data-bs-toggle="modal"
      data-bs-target="#loginModal">Login</button>`;
}

async function handleLoggedInUser(elements, links) {
  const linkProfile = {
    href: `${URLS.PROFILE}?name=${getUser().name}`,
    text: "Profile",
  };
  const userDataLocal = getItem("user");
  const userUrl = `${API_URLS.PROFILES}/${userDataLocal.name}?_listings=true`;

  const response = await fetch(`${userUrl}`, { headers: headers() });
  const userDataApi = await response.json();

  if (response.ok) {
    userDataApi.avatar = userDataApi.avatar || DEFAULT_URLS.AVATAR;
    updateUserInfo(getItem("name"), elements, userDataApi);

    window.addEventListener("resize", () => {
      const isMobileView = window.innerWidth < 992;
      setupNav(elements, links, isMobileView);
    });

    setupLogoutButton();

    links.push(linkProfile);

    setupNav(elements, links);
  }
}

function handleLoggedOutUser(elements) {
  handleWindowResize(elements, []);
  window.addEventListener("resize", () => handleWindowResize(elements, []));
}

function setupLogoutButton() {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", logoutUser);
  }
}
