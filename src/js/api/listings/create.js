import { API_URLS, headers } from "../index.js";
import { alert } from "../../utilities/index.js";

export async function postListing(title, endsAt, description, media, tags) {
  const response = await fetch(API_URLS.LISTINGS, {
    method: "POST",
    body: JSON.stringify({ title, endsAt, description, media, tags }),
    headers: headers("application/json"),
  });

  if (response.ok) {
    const listing = await response.json();

    alert(
      "success",
      "Listing successfully posted!",
      ".alert-create-listing",
      3000,
      false
    );

    return listing;
  } else {
    alert(
      "danger",
      "An error occured when attempting to post listing",
      ".alert-create-listing",
      null
    );

    throw new Error("An error occured when attempting to post listing");
  }
}

export async function createListingEvent(event) {
  event.preventDefault();

  const form = event.target;
  const data = new FormData(form);

  const mediaInputs = document.querySelectorAll("#mediaInputsContainer input");

  const tagInputs = document.querySelectorAll("#tagInputsContainer input");

  const title = data.get("title");
  const endsAt = data.get("endsAt");
  const description = data.get("description");
  const media = data.get("media");
  const tags = data.get("tags");

  const now = new Date();

  const mediaArray = Array.from(mediaInputs).map((input) => input.value);
  const tagArray = Array.from(tagInputs).map((input) => input.value);

  if (title.length < 1) {
    alert("danger", "Title is required", ".alert-create-listing", null);

    return;
  }

  if (endsAt < now) {
    alert(
      "danger",
      "End date must be in the future",
      ".alert-create-listing",
      null
    );

    return;
  }

  try {
    // await createListing(title, endsAt, description, media, tags);

    console.log("Title: ", title);
    console.log("End date: ", endsAt);
    console.log("Description: ", description);
    console.log("Media: ", media);
    console.log("Tags: ", tags);

    alert("success", "Listing successfully posted!", ".alert-create-listing");
  } catch {
    alert(
      "danger",
      "An error occured when attempting to post listing",
      ".alert-create-listing",
      null
    );
  }
}

export async function createListing() {
  const form = document.querySelector("#createListingForm");
  const titleInput = document.querySelector("#createListingTitle");
  const endDateInput = document.querySelector("#createListingDate");
  const descriptionInput = document.querySelector("#createListingDescription");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const endDate = endDateInput.value;
    const description = descriptionInput.value;

    const mediaInputs = document.querySelectorAll(
      "#mediaInputsContainer input"
    );
    const media = Array.from(mediaInputs).map((input) => input.value);

    const tagInputs = document.querySelectorAll("#tagInputsContainer input");
    const tags = Array.from(tagInputs).map((input) => input.value);

    const listing = {
      title: title,
      endsAt: new Date(endDate),
      description: description,
      media: media,
      tags: tags,
    };

    return listing;
  });
}
