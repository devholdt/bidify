import { API_URLS, headers } from "../index.js";

export async function editListing(id, title, description, media, tags) {
  const url = `${API_URLS.LISTINGS}/${id}`;
  const editedListing = {
    title: title,
    description: description,
    media: media,
    tags: tags,
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(editedListing),
      headers: headers("application/json"),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log("An error occcured when editing listing", error);
  }
}
