import { URLS, DEFAULT_URLS, WIDTH } from "../components/index.js";
import { getItem } from "../storage/index.js";
import { getProfile } from "../api/profiles/index.js";
import { alert } from "./index.js";

let cachedUserData = null;

export async function setupNav(elements, links) {
  const isMobileView = window.innerWidth < WIDTH.MEDIUM;
  const isLoggedIn = getItem("name");

  updateNavButtons(isLoggedIn, elements.navButtons, elements.bannerButtons);
  updateNavLinks(elements.navLinks, links, isMobileView);
  updateNavLinksCollapse(elements.navLinksCollapse, links, isMobileView);

  if (isLoggedIn && !cachedUserData) {
    try {
      cachedUserData = await getProfile(getItem("name"));
    } catch (error) {
      alert(
        "danger",
        "An error occurred when attempting to update user info",
        ".alert-absolute",
        null
      );
      throw new Error(
        `An error occured when attempting to update user info: ${error}`
      );
    }
  }

  if (isLoggedIn) {
    updateUserInfo(getItem("name"), elements, cachedUserData, isMobileView);
  } else {
    elements.navLinksCollapse.classList.remove("border-top", "pt-3");
  }
}

export function updateNavLinksCollapse(navLinksCollapse, links, isMobileView) {
  if (isMobileView) {
    updateNavLinks(navLinksCollapse, links);
    navLinksCollapse.classList.add("border-top", "pt-3");
  } else {
    navLinksCollapse.classList.remove("border-top", "pt-3");
    navLinksCollapse.innerHTML = "";
  }
}

export function updateNavLinks(container, links) {
  const { pathname } = document.location;

  container.innerHTML = links
    .map(
      (link) => `
      <div class="nav-item nav-regular">
          <a href="${link.href}${link.parameter}" class="nav-link text-white ${
        pathname === `/${link.href}` ? "active" : ""
      }">
              <span>${link.text}</span>
          </a>
      </div>`
    )
    .join("");
}

export function updateUserInfo(userName, elements, userData, isMobileView) {
  if (userName) {
    if (isMobileView) {
      userInfo(elements.userInfoCollapse, userData);
      elements.userInfoHeader.innerHTML = "";
    } else {
      userInfo(elements.userInfoHeader, userData);
      elements.userInfoCollapse.innerHTML = "";
    }
  }
}

function userInfo(container, userData) {
  container.innerHTML = `
      <div class="d-flex">
        <a href="${URLS.PROFILE}?name=${
    userData.name
  }" class="d-flex gap-2 text-decoration-none text-dark pe-2">
          <img src="${
            userData.avatar || DEFAULT_URLS.AVATAR
          }" class="avatar" alt="${userData.name}'s avatar">
          <div class="d-flex flex-column">
            <p class="mb-0 fw-light">${userData.name}</p>
            <p class="text-primary fw-normal">$${userData.credits}</p>
          </div>
        </a>
        <button class="btn btn-outline-dark h-100 my-auto ms-2 rounded-0 shadow-sm" data-bs-toggle="modal" data-bs-target="#logoutModal">
          <span>logout</span>
        </button>
      </div>`;
}

function updateNavButtons(isLoggedIn, navButton, bannerButton) {
  if (isLoggedIn) {
    navButton.innerHTML = `
        <div class="nav-divider"></div>
        <div class="nav-item nav-regular">
            <button class="nav-link text-white btn-login"
            data-bs-toggle="modal" data-bs-target="#logoutModal">
              <span>Logout</span>
            </button>
        </div>`;

    if (bannerButton) {
      bannerButton.innerHTML = `
            <button type="button" class="btn btn-yellow btn-cta banner-listings-button">Listings</button>`;

      document
        .querySelector(".banner-listings-button")
        .addEventListener("click", () => {
          document.querySelector(".listing-sorting").scrollIntoView();
        });
    }
  } else {
    navButton.innerHTML = `
      <div class="nav-divider"></div>
      <div class="nav-item nav-regular">
          <button class="nav-link text-white btn-login" data-bs-toggle="modal"
          data-bs-target="#loginModal"><span>Login</span></button>
      </div>`;

    if (bannerButton) {
      bannerButton.innerHTML = `
        <button type="button" class="btn btn-primary btn-cta"
        data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>`;
    }
  }
}
