import { getItem } from "../../storage/index.js";
import { API_URLS, headers } from "../../api/index.js";
import { URLS, WIDTH } from "../index.js";
import { updateUserInfo, setupNav } from "../../utilities/index.js";
import { handleWindowResize } from "./index.js";
import { logoutUser } from "../../auth/index.js";

export async function handleLoggedInUser(elements, links) {
  // const linkProfile = {
  //   href: `${URLS.PROFILE}`,
  //   parameter: `?name=${getItem("name")}`,
  //   text: "Profile",
  // };

  const userDataLocal = getItem("user");
  const userUrl = `${API_URLS.PROFILES}/${userDataLocal.name}?_listings=true`;

  try {
    const response = await fetch(`${userUrl}`, { headers: headers() });
    const userDataApi = await response.json();

    if (response.ok) {
      userDataApi.avatar = userDataApi.avatar || DEFAULT_URLS.AVATAR;
      updateUserInfo(getItem("name"), elements, userDataApi);

      window.addEventListener("resize", () => {
        const isMobileView = window.innerWidth < WIDTH.MEDIUM;
        setupNav(elements, links, isMobileView);
      });

      setupLogoutButton();

      // links.push(linkProfile);

      // setupNav(elements, links);

      const profileLink = links.find((link) => link.text === "Profile");
      if (profileLink) {
        profileLink.hidden = false;
      }

      setupNav(elements, links);
    }
  } catch (error) {
    console.log("handleUserState.js: ");
    console.error(error);
  }
}

export function loginButtonHTML() {
  return `
      <button type="button"
        class="btn btn-outline-primary rounded-1 text-uppercase d-flex ms-auto px-4 shadow-sm" data-bs-toggle="modal"
        data-bs-target="#loginModal">Login</button>`;
}

export function handleLoggedOutUser(elements) {
  handleWindowResize(elements, []);
  window.addEventListener("resize", () => handleWindowResize(elements, []));
}

export function setupLogoutButton() {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", logoutUser);
  }
}
