import { API_URLS, headers } from "../index.js";
// import { alert } from "../../utilities/index.js";

export async function editListing(id, title, description) {
  const url = `${API_URLS.LISTINGS}/${id}`;
  const editedListing = {
    title: title,
    description: description,
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
