import { editListing } from "../api/index.js";
import { alert, collectInputValues } from "../utilities/index.js";

export async function editListingEvent(event) {
  event.preventDefault();

  const url = new URL(location.href);
  const params = new URLSearchParams(url.search);
  const id = params.get("id");

  const titleInput = document.querySelector("#editListingTitle");
  const descriptionInput = document.querySelector("#editListingDescription");
  const mediaValues = collectInputValues("editMediaInputsContainer");
  const tagValues = collectInputValues("editTagInputsContainer");

  try {
    await editListing(
      id,
      titleInput.value,
      descriptionInput.value,
      mediaValues,
      tagValues
    );
  } catch (error) {
    alert(
      "danger",
      "An error occured when attempting to edit listing",
      ".alert-absolute",
      null
    );
  }
}
