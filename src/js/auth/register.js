import { APIv2_URLS, headers } from "../api/index.js";
import { URLS } from "../components/index.js";
import { alert } from "../utilities/index.js";
import { setItem } from "../storage/index.js";

/**
 * Registers a new user with the provided details and attempts to log them in.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password for the user's account.
 * @returns {Promise<object>} A promise that resolves to the registered user's data.
 * @throws {Error} Throws an error if registration or automatic login fails.
 */
export async function registerUser(name, email, password) {
	try {
		const response = await fetch(APIv2_URLS.REGISTER, {
			method: "POST",
			body: JSON.stringify({ name, email, password }),
			headers: headers("application/json"),
		});

		console.log("RESPONSE - ", response);

		if (response.ok) {
			const json = await response.json();
			const user = json.data;

			alert(
				"success",
				`User registration successful! Welcome, <span class="fw-semibold">${user.name}</span>`,
				".alert-register",
				null,
				false
			);

			try {
				const loginResponse = await fetch(APIv2_URLS.LOGIN, {
					method: "POST",
					body: JSON.stringify({ email, password }),
					headers: headers("application/json"),
				});

				if (loginResponse.ok) {
					const loginJson = await loginResponse.json();
					const loginUser = loginJson.data;

					setItem({ key: "token", value: loginUser.accessToken });
					setItem({ key: "user", value: loginUser });
					setItem({ key: "name", value: loginUser.name });

					// setTimeout(() => {
					// 	location.href = `${URLS.PROFILE}?name=${loginUser.name}`;
					// }, 2000);
				}
			} catch (error) {
				alert(
					"danger",
					"An error occured when attempting to automatically login - please log in manually",
					".alert-register"
				);
				throw new Error(
					`An error occured when attempting to automatically login: ${error}`
				);
			}

			return user;
		}
	} catch (error) {
		alert(
			"danger",
			"An error occured when attempting user registration",
			".alert-register",
			null
		);
		throw new Error(
			`An error occured when attempting user registration: ${error}`
		);
	}
}
