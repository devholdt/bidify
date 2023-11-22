import { API_URLS } from "../api/index.js";
import { headers } from "../api/index.js";
import { setItem } from "../storage/index.js";

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
    return user;
  }

  throw new Error(response.statusText);
}

export async function loginEvent(event) {
  event.preventDefault();

  const form = event.target;
  const data = new FormData(form);
  const email = data.get("email");
  const password = data.get("password");

  try {
    const { name } = await loginUser(email, password);
    // location.href = `/profile.html?name=${name}`;
    console.log(`You are now logged into ${name}`);
  } catch (error) {
    console.error(`An error occured when attempting to log in: ${error}`);
  }
}
