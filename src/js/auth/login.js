import { API_URLS, headers } from "../api/index.js";
import { setItem } from "../storage/index.js";
import { alert } from "../utilities/index.js";

/**
 * Attempts to log in a user with the provided email and password.
 *
 * @param {string} email - The email of the user trying to log in.
 * @param {string} password - The password of the user trying to log in.
 * @returns {Promise<object>} A promise that resolves to the user's data if login is successful.
 * @throws {Error} Throws an error if the login process fails.
 */
export async function loginUser(email, password) {
	try {
		const response = await fetch(API_URLS.LOGIN, {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: headers("application/json"),
		});

		if (response.ok) {
			const json = await response.json();
			const user = json.data;

			setItem({ key: "token", value: user.accessToken });
			setItem({ key: "user", value: user });
			setItem({ key: "name", value: user.name });

			alert(
				"success",
				`Login successful! Welcome back, <span class="fw-semibold">${user.name}</span>`,
				".alert-login",
				null,
				false
			);

			return user;
		}
	} catch (error) {
		alert("danger", "Login unsuccsessful", ".alert-login", null);
		throw new Error(`Login unsuccessful: ${error}`);
	}
}
