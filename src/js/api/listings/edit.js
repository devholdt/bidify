import { API_URLS, headers } from "../index.js";
import { alert } from "../../utilities/index.js";

export async function editListing(id, title, description, media, tags) {
  const editedListing = {
    title: title,
    description: description,
    media: media,
    tags: tags,
  };

  try {
    const response = await fetch(`${API_URLS.LISTINGS}/${id}`, {
      method: "PUT",
      body: JSON.stringify(editedListing),
      headers: headers("application/json"),
    });

    if (response.ok) {
      alert(
        "success",
        "Listing successfully edited",
        ".alert-absolute",
        3000,
        false
      );

      setTimeout(() => {
        location.reload();
      }, 3000);

      return await response.json();
    }
  } catch (error) {
    alert(
      "danger",
      "An error occured when attempting to edit listing",
      ".alert-absolute",
      null
    );
    throw new Error(
      `An error occured when attempting to edit listing: ${error}`
    );
  }
}
