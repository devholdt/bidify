import { alert, handleInputs } from "../utilities/index.js";
import { API_URLS, headers, getListing } from "../api/index.js";

export async function listingInteractions(event) {
  let targetElement = event.target;

  if (
    targetElement.tagName === "SPAN" &&
    targetElement.parentElement.classList.contains("btn")
  ) {
    targetElement = targetElement.parentElement;
  }

  if (targetElement.classList.contains("btn-delete")) {
    if (confirm("Are you sure you want to delete this listing?") === true) {
      const id = targetElement.dataset.id;
      try {
        console.log("Listing successfully deleted");
        const response = await fetch(`${API_URLS.LISTINGS}/${id}`);

        if (response.ok) {
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

  if (targetElement.classList.contains("btn-edit")) {
    const id = targetElement.dataset.id;
    // const url = `${API_URLS.LISTINGS}/${id}`;

    try {
      const response = await getListing(id);

      console.log(response);

      if (response.ok) {
        console.log(response);
      }
    } catch {
      alert(
        "danger",
        "An error occured when attempting to edit listing",
        ".alert-absolute",
        4000
      );
    }
  }
}
