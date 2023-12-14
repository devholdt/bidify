import { API_URLS, headers, invalidateCache } from "../api/index.js";

export async function deleteListingEvent(event) {
  let targetElement = event.target;

  if (
    targetElement.tagName === "SPAN" &&
    targetElement.parentElement.classList.contains("btn")
  ) {
    targetElement = targetElement.parentElement;
  }

  const id = targetElement.dataset.id;

  if (confirm("Are you sure you want to delete this listing?") === true) {
    try {
      const response = await fetch(`${API_URLS.LISTINGS}/${id}`, {
        method: "DELETE",
        headers: headers("application/json"),
      });

      if (response.ok) {
        invalidateCache();
        location.reload();
      }
    } catch {
      alert(
        "danger",
        "An error occured when attempting to delete listing",
        ".alert-absolute",
        4000
      );
    }
  }
}
