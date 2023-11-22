import { API_URLS } from "../api/index.js";
import { headers } from "../api/index.js";

export async function registerUser(name, email, password, avatar) {
  const response = await fetch(API_URLS.REGISTER, {
    method: "POST",
    body: JSON.stringify({ name, email, password, avatar }),
    headers: headers("application/json"),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}

export async function registerEvent(event) {
  event.preventDefault();

  const form = event.target;
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const password = data.get("password");
  const avatar = data.get("avatar");

  try {
    await registerUser(name, email, password, avatar);
  } catch (error) {
    console.error(`An error occured when registering user: ${error}`);
  }
}
