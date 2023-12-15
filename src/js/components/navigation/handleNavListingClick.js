import { setItem } from "../../storage/index.js";

/**
 * Handles navigation clicks for listing-related links.
 */
export function handleNavListingClick() {
  const currentPath = location.pathname;
  if (currentPath === "/index.html") {
    document.querySelector(".listing-sorting").scrollIntoView();
  } else if (currentPath === "/profile.html") {
    location.href = "index.html";
    setItem({ key: "scrollRequired", value: "true" });
  }
}
