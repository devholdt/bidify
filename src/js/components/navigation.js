import { DEFAULT_URLS, URLS } from "./index.js";
import { getItem, getUser } from "../storage/index.js";
import { API_URLS, headers } from "../api/index.js";
import { logoutUser } from "../auth/logout.js";
import { alert } from "../utilities/index.js";

export async function renderNav() {
  const { pathname } = document.location;

  const userInfoHeader = document.querySelector(".user-info-header");
  const navLinks = document.querySelector(".nav-links");
  const navButtons = document.querySelector(".nav-buttons");
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

        userInfoHeader.innerHTML = `
          <div class="d-flex">
            <a href="${URLS.PROFILE}?name=${userDataApi.name}" class="d-flex gap-2 text-decoration-none text-dark border-end pe-2">
              <img src="${userDataApi.avatar}" class="avatar" alt="${userDataApi.name}'s avatar" onerror='this.src="${DEFAULT_URLS.AVATAR}"'>
              <div class="d-flex flex-column">
                <p class="mb-0 fw-medium">${userDataApi.name}</p>
                <p>$${userDataApi.credits}</p>
              </div>
            </a>
            <button class="btn btn-outline-dark h-100 my-auto ms-2 rounded-0 shadow-sm" 
            data-bs-toggle="modal" data-bs-target="#logoutModal">
              <span>logout</span>
            </button>
          </div>`;

        navButtons.innerHTML = `
          <div class="nav-divider"></div>
          <li class="nav-item nav-regular">
              <button class="nav-link text-white btn-login" 
              data-bs-toggle="modal" data-bs-target="#logoutModal">
                <span>Logout</span>
              </button>
          </li>`;

        if (bannerButtons) {
          bannerButtons.innerHTML = `
            <button type="button" class="btn btn-yellow btn-cta">Listings</button>`;
        }

        const logoutButton = document.getElementById("logoutButton");
        logoutButton.addEventListener("click", logoutUser);

        links.push(linkProfile);
      }
    } else {
      navButtons.innerHTML = `
      <div class="nav-divider"></div>
      <li class="nav-item nav-regular">
          <button class="nav-link text-white btn-login" data-bs-toggle="modal"
          data-bs-target="#loginModal"><span>Login</span></button>
      </li>`;

      if (bannerButtons) {
        bannerButtons.innerHTML = `
        <button type="button" class="btn btn-primary btn-cta" 
        data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>`;
      }
    }

    navLinks.innerHTML = links
      .map(
        (link) => `
    <li class="nav-item nav-regular">
        <a href="${link.href}" class="nav-link text-white ${
          pathname === `/${link.href}` ? "active" : ""
        }">
            <span>${link.text}</span>
        </a>
    </li>`
      )
      .join("");
  } catch {
    alert(
      "danger",
      "An error occured when attempting to render navigation menu",
      ".alert-absolute",
      null,
      false
    );
  }
}
