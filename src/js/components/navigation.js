import { getItem } from "../storage/index.js";
import { API_PATH } from "../api/index.js";
import { headers } from "../api/index.js";
import { DEFAULT_URLS, URLS } from "./constants.js";

export async function renderNav() {
  const { pathname } = document.location;

  const navbarTop = document.querySelector(".navbar-top");
  const nav = document.querySelector(".nav-rendered");

  const userUrl = `${API_PATH}/auction/profiles/${getItem(
    "name"
  )}?_listings=true`;

  try {
    const response = await fetch(`${userUrl}`, { headers: headers() });
    const apiUserData = await response.json();

    const links = [
      { href: URLS.INDEX, text: "Home" },
      { href: URLS.PROFILE, text: "Profile" },
    ];

    const userInfoHeader = document.querySelector(".user-info-header");

    if (apiUserData) {
      if (apiUserData.avatar === null) {
        apiUserData.avatar = DEFAULT_URLS.AVATAR;
      }

      userInfoHeader.innerHTML = `
        <div>
            <img src="${apiUserData.avatar}" class="avatar" alt="${apiUserData.name}'s avatar" onerror='this.src="${DEFAULT_URLS.AVATAR}"' width="40">
            <a href="${URLS.PROFILE}?name=${apiUserData.name}">${apiUserData.name}</a>
        </div>`;
    }

    nav.innerHTML = links
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
