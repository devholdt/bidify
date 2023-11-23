import { getItem } from "../storage/index.js";
import { API_PATH } from "../api/index.js";
import { headers } from "../api/index.js";
import { DEFAULT_URLS, URLS } from "./constants.js";

export async function renderNav() {
  const { pathname } = document.location;

  const userInfoHeader = document.querySelector(".user-info-header");
  const navLinks = document.querySelector(".nav-links");
  const navButtons = document.querySelector(".nav-buttons");

  const links = [
    { href: URLS.INDEX, text: "Home" },
    { href: URLS.PROFILE, text: "Profile" },
  ];

  navButtons.innerHTML = `
  <div class="nav-divider"></div>
  <li class="nav-item nav-regular">
      <button class="nav-link text-white btn-login" data-bs-toggle="modal"
      data-bs-target="#loginModal"><span>Log in</span></button>
  </li>`;

  try {
    if (getItem("name")) {
      const userUrl = `${API_PATH}/auction/profiles/${getItem(
        "name"
      )}?_listings=true`;

      const response = await fetch(`${userUrl}`, { headers: headers() });
      const apiUserData = await response.json();

      if (apiUserData) {
        navButtons.innerHTML = "";
      }

      if (response.ok) {
        if (apiUserData.avatar === null) {
          apiUserData.avatar = DEFAULT_URLS.AVATAR;
        }

        userInfoHeader.innerHTML = `
            <a href="${URLS.PROFILE}?name=${apiUserData.name}" class="d-flex gap-2 text-decoration-none text-dark">
                <img src="${apiUserData.avatar}" class="avatar" alt="${apiUserData.name}'s avatar" onerror='this.src="${DEFAULT_URLS.AVATAR}"'>
                <div class="d-flex flex-column">
                    <p class="mb-0 fw-medium">${apiUserData.name}</p>
                    <p>Credit(s): ${apiUserData.credits}</p>
                </div>
            </a>`;
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
  } catch (error) {
    console.error(
      `An error occured when attempting to render nav menu: ${error}`
    );
  }
}
