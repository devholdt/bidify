import { API_URLS, headers } from "../api/index.js";
import { getItem } from "../storage/index.js";
import { alert } from "../utilities/index.js";

/**
 * Handles the event for editing a user's profile, specifically updating the avatar.
 *
 * @param {Event} event - The event object associated with the profile edit action.
 * @throws {Error} Throws an error if the profile edit fails.
 */
export async function editProfileEvent(event) {
	event.preventDefault();

	try {
		const url = `${API_URLS.PROFILES}/${getItem("name")}`;

		const userResponse = await fetch(`${url}`, {
			headers: headers(null, true),
		});

		const userJson = await userResponse.json();
		const user = userJson.data;

		const avatarUrlInput = document.querySelector("#editAvatarUrl");
		const avatarAltInput = document.querySelector("#editAvatarAlt");
		const avatarUrl = avatarUrlInput.value;
		const avatarAlt = avatarAltInput.value;

		let newUser = {
			avatar: {
				url: user.avatar.url,
				alt: user.avatar.alt,
			},
		};

		if (avatarUrl.trim() !== "" || avatarAlt.trim() !== "") {
			newUser = {
				avatar: {
					url: avatarUrl,
					alt: avatarAlt,
				},
			};
		}

		const response = await fetch(url, {
			method: "PUT",
			body: JSON.stringify(newUser),
			headers: headers("application/json", true),
		});

		const json = await response.json();

		if (response.ok) {
			alert("success", "Avatar updated", ".alert-editprofile");

			user.avatar.url = newUser.avatar.url;
			user.avatar.alt = newUser.avatar.alt;

			const avatars = document.querySelectorAll(".avatar");

			avatars.forEach((avatar) => {
				avatar.src = newUser.avatar.url;
				avatar.alt = newUser.avatar.alt;
			});

			const editProfileModal = bootstrap.Modal.getInstance(
				document.getElementById("editProfileModal")
			);
			setTimeout(() => {
				editProfileModal.hide();
			}, 2000);
		} else {
			alert(
				"danger",
				`An error with status "${json.errors.statusCode} ${json.errors.status}" occurred: ${json.errors.message}`
			);

			throw new Error(
				`An error with status "${json.errors.statusCode} ${json.errors.status}" occurred: ${json.errors.message}`
			);
		}
	} catch (error) {
		throw new Error(
			`An error occured when attempting to edit profile: ${error}`
		);
	}
}
