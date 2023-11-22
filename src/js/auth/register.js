import { API_URLS } from "../api/index.js";
import { URLS } from "../components/constants.js";
import { headers } from "../api/index.js";
import { alert } from "../utilities/message.js";

export async function registerUser(name, email, password, avatar) {
  const response = await fetch(API_URLS.REGISTER, {
    method: "POST",
    body: JSON.stringify({ name, email, password, avatar }),
    headers: headers("application/json"),
  });

  if (response.ok) {
    const user = await response.json();

    alert(
      "success",
      `User registration successful! Welcome, <span class="fw-semibold">${user.name}</span>`,
      ".alert-register",
      null,
      false
    );

    return user;
  } else {
    alert(
      "danger",
      "Invalid user registration credentials",
      ".alert-register",
      null
    );
  }
}

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
    setTimeout(() => {
      location.href = `${URLS.PROFILE}?name=${name}`;
    }, 2000);
  } catch (error) {
    alert(
      "danger",
      "An error occured when attempting user registration",
      ".alert-register",
      null
    );
  }
}
