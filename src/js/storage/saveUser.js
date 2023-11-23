import { setItem } from "./index.js";

export function saveUser(user) {
  setItem({ key: userKey, value: user });
}
