/**
 * Logs out user by removing relevant items from localStorage and reloading page.
 */
export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("name");
  location.reload();
}
