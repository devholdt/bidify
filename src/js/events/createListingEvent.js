import { createListing } from "../api/index.js";
import { alert } from "../utilities/index.js";

export async function createListingEvent(event) {
  event.preventDefault();

  const form = document.getElementById("createListingForm");
  const title = form.querySelector("#createListingTitle").value;
  const endsAt = form.querySelector("#createListingDate").value;
  const description = form.querySelector("#createListingDescription").value;

  const mediaInputs = form.querySelectorAll(
    "#createMediaInputsContainer input"
  );
  const media = Array.from(mediaInputs)
    .map((input) => input.value)
    .filter((value) => value.trim() !== "");

  const tagInputs = form.querySelectorAll("#createTagInputsContainer input");
  const tags = Array.from(tagInputs)
    .map((input) => input.value)
    .filter((value) => value.trim() !== "");

  const now = new Date();

  if (title.length < 1) {
    const titleInput = form.querySelector("#createListingTitle");

    titleInput.style.borderColor = "#FF5252";

    setTimeout(() => {
      titleInput.style.borderColor = "#9D9696";
    }, 2000);

    alert("danger", "Title is required", ".alert-create-listing", null);

    return;
  }

  if (new Date(endsAt) <= now) {
    const endsAtInput = form.querySelector("#createListingDate");

    endsAtInput.style.borderColor = "#FF5252";

    setTimeout(() => {
      endsAtInput.style.borderColor = "#9D9696";
    }, 2000);

    alert(
      "danger",
      "End date must be in the future",
      ".alert-create-listing",
      null
    );

    return;
  }

  try {
    await createListing(title, endsAt, description, media, tags);

    form.reset();

    alert(
      "success",
      "Listing successfully posted!",
      ".alert-create-listing",
      6000,
      false
    );
  } catch {
    alert(
      "danger",
      "An error occured when attempting to post listing",
      ".alert-create-listing",
      null
    );
  }
}
