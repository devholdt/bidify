import { alert } from "../utilities/index.js";
import { registerUser } from "../auth/index.js";

/**
 * Handles the event for user registration.
 *
 * @param {Event} event - The event object associated with the registration action.
 * @throws {Error} Throws an error if the registration attempt is unsuccessful.
 */
export async function registerEvent(event) {
  event.preventDefault();

  const form = event.target;
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const password = data.get("password");
  const avatar = data.get("avatar");

  if (name.length < 1 || email.length < 1 || password.length < 1) {
    alert(
      "danger",
      "Please fill out all required fields.",
      ".alert-register",
      null
    );

    return;
  }

  try {
    await registerUser(name, email, password, avatar);
  } catch (error) {
    alert(
      "danger",
      "Invalid user registration credentials",
      ".alert-register",
      null
    );
    throw new Error(`Invalid user registration credentials: ${error}`);
  }
}
