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
    titleInput.classList.add("border-danger");

    setTimeout(() => {
      titleInput.classList.remove("border-danger");
    }, 3000);

    alert("warning", "Title is required", ".alert-create-listing", 3000);

    return;
  }

  if (new Date(endsAt) <= now) {
    const endsAtInput = form.querySelector("#createListingDate");
    endsAtInput.classList.add("border-danger");

    setTimeout(() => {
      endsAtInput.classList.remove("border-danger");
    }, 2000);

    alert(
      "warning",
      "End date must be in the future",
      ".alert-create-listing",
      3000
    );

    return;
  }

  try {
    await createListing(title, endsAt, description, media, tags);

    setTimeout(() => {
      form.reset();
      location.reload();
    }, 3000);
  } catch (error) {
    alert(
      "danger",
      "An error occured when attempting to create listing",
      ".alert-create-listing",
      null
    );
    console.error(
      "An error occured when attempting to create listing: ",
      error
    );
  }
}

document
  .querySelector("#createListingDescription")
  .addEventListener("input", (event) => {
    const textarea = event.target;
    if (textarea.value.length === 280) {
      textarea.classList.add("border-danger");
      alert(
        "warning",
        "Maximum character length reached",
        ".alert-create-listing",
        3000
      );

      setTimeout(() => {
        textarea.classList.remove("border-danger");
      }, 3000);
    }
  });
