import { API_URLS, headers } from "../api/index.js";
import { URLS } from "../components/index.js";
import { alert } from "../utilities/index.js";
import { setItem } from "../storage/index.js";

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

    try {
      const loginResponse = await fetch(API_URLS.LOGIN, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: headers("application/json"),
      });

      if (loginResponse.ok) {
        const loginUser = await loginResponse.json();
        setItem({ key: "token", value: loginUser.accessToken });
        setItem({ key: "user", value: loginUser });
        setItem({ key: "name", value: loginUser.name });

        setTimeout(() => {
          location.href = `${URLS.PROFILE}?name=${loginUser.name}`;
        }, 2000);
      }
    } catch (error) {
      alert(
        "danger",
        "An error occured when attempting to automatically login - please log in manually",
        ".alert-register"
      );
      console.error(
        "An error occured when attempting to automatically login: ",
        error
      );
    }

    return user;
  } else {
    alert(
      "danger",
      "An error occured when attempting user registration",
      ".alert-register",
      null
    );

    throw new Error("An error occured when attempting user registration");
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
  } catch (error) {
    alert(
      "danger",
      "Invalid user registration credentials",
      ".alert-register",
      null
    );
    console.error("Invalid user registration credentials: ", error);
  }
}
