import { alert } from "../utilities/index.js";
import { URLS } from "../components/index.js";
import { loginUser } from "../auth/index.js";

/**
 * Handles the event for user login.
 *
 * @param {Event} event - The event object associated with the login action.
 * @throws {Error} Throws an error if the login attempt is unsuccessful.
 */
export async function loginEvent(event) {
  event.preventDefault();

  const form = event.target;
  const data = new FormData(form);
  const email = data.get("email");
  const password = data.get("password");

  if (email.length < 1 || password.length < 1) {
    alert(
      "danger",
      "Both email and password are required.",
      ".alert-login",
      null
    );

    return;
  }

  try {
    const { name } = await loginUser(email, password);
    setTimeout(() => {
      location.href = `${URLS.PROFILE}?name=${name}`;
    }, 2000);
  } catch (error) {
    alert("danger", "Invalid login credentials", ".alert-login", null);
    throw new Error(`Invalid login credentials: ${error}`);
  }
}
