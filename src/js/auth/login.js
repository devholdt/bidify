import { API_URLS } from "../api/index.js";
import { URLS } from "../components/index.js";
import { headers } from "../api/index.js";
import { setItem } from "../storage/index.js";
import { alert } from "../utilities/index.js";

export async function loginUser(email, password) {
  const response = await fetch(API_URLS.LOGIN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: headers("application/json"),
  });

  if (response.ok) {
    const user = await response.json();
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
  } else {
    alert("danger", "Login unsuccsessful.", ".alert-login", null);

    throw new Error("Login unsuccessful");
  }
}

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
    alert("danger", "Invalid login credentials.", ".alert-login", null);
    console.error("Invalid login credentials: ", error);
  }
}
