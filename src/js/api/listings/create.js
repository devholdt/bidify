import { API_URLS, headers } from "../index.js";
import { alert } from "../../utilities/index.js";
import { getUser } from "../../storage/index.js";

const user = getUser();

if (!user) {
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

      setTimeout(() => {
        location.reload();
      }, 3000);

      return await response.json();
    }
  } catch {
    throw new Error(response.statusText);
  }
}
