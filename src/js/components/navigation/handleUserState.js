import { getItem } from "../../storage/index.js";
import { API_URLS, headers } from "../../api/index.js";
import { DEFAULT_URLS, WIDTH } from "../index.js";
import {
	updateUserInfo,
	setupNav,
	alert,
	debounce,
} from "../../utilities/index.js";
import { handleWindowResize } from "./index.js";
import { logoutUser } from "../../auth/index.js";

/**
 * Performs actions based on the logged-in user's information and updates the UI accordingly.
 *
 * @param {HTMLElement[]} elements - A collection of elements to be updated with user information.
 * @param {object[]} links - A collection of navigation links to be updated based on user status.
 * @throws {Error} Throws an error if fetching user information fails.
 */
export async function handleLoggedInUser(elements, links) {
	const userUrl = `${API_URLS.PROFILES}/${getItem("name")}?_listings=true`;

	try {
		const response = await fetch(`${userUrl}`, {
			method: "GET",
			headers: headers(null, true),
		});
		const json = await response.json();
		const userDataApi = json.data;

		if (response.ok) {
			userDataApi.avatar = userDataApi.avatar || DEFAULT_URLS.AVATAR;

			updateUserInfo(userDataApi.name, elements, userDataApi);

			const debouncedSetupNav = debounce(() => {
				const isMobileView = window.innerWidth <= WIDTH.MEDIUM;
				setupNav(elements, links, isMobileView);
			});

			window.addEventListener("resize", debouncedSetupNav);

			setupLogoutButton();

			const profileLink = links.find((link) => link.text === "Profile");
			if (profileLink) {
				profileLink.hidden = false;
			}

			setupNav(elements, links);
		}
	} catch (error) {
		alert(
			"danger",
			"An error occured when checking login state",
			".alert-absolute",
			null
		);
		throw new Error(`An error occured when checking login state: ${error}`);
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
