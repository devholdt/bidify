import { setItem } from "./index.js";

const userKey = "user";

export function saveUser(user) {
  setItem({ key: userKey, value: user });
}
