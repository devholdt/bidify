import { getItem } from "./index.js";

export function getUser() {
  const user = getItem(userKey);

  if (user) {
    return JSON.parse(user);
  }

  return null;
}
