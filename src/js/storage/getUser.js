import { getItem } from "./index.js";

const userKey = "user";

export function getUser() {
  const user = getItem(userKey);

  if (user) {
    return user;
  }

  return null;
}
