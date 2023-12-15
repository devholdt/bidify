import { API_URLS, headers } from "../index.js";
import { alert } from "../../utilities/index.js";
import { getItem } from "../../storage/index.js";

const name = getItem("name");

if (!name) {
  document.querySelector(".create-listing").style.display = "none";
}

export async function createListing(title, endsAt, description, media, tags) {
  const listing = {
    title: title,
    endsAt: endsAt,
    description: description,
    media: media,
    tags: tags,
  };

  try {
    const response = await fetch(API_URLS.LISTINGS, {
      method: "POST",
      body: JSON.stringify(listing),
      headers: headers("application/json"),
    });

    if (response.ok) {
      alert(
        "success",
        "Listing successfully posted!",
        ".alert-create-listing",
        3000,
        false
      );

      return await response.json();
    }
  } catch (error) {
    alert(
      "danger",
      "An error occured when attempting to create listing",
      ".alert-create-listing",
      null
    );
    throw new Error(
      `An error occured when attempting to create listing: ${error}`
    );
  }
}
