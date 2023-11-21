import { API_PATH } from "../api/constants.js";
import { headers } from "../api/headers.js";

export async function registerUser(name, email, password, avatar) {
  const response = await fetch(`${API_PATH}/auction/auth/register`, {
    method: "POST",
    body: JSON.stringify({ name, email, password, avatar }),
    headers: headers("application/json"),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
