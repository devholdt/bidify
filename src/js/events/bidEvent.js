import { bidListing } from "../api/index.js";
import { alert } from "../utilities/index.js";

export async function bidEvent(event) {
  event.preventDefault();

  const url = new URL(location.href);
  const params = new URLSearchParams(url.search);
  const id = params.get("id");
  const amountInput = document.querySelector("#amount");

  try {
    await bidListing(id, parseInt(amountInput.value));
  } catch (error) {
    alert(
      "danger",
      "An error occured when attempting to bid on listing",
      ".alert-preview",
      null
    );
    throw new Error(
      `An error occured when attempting to bid on listing: ${error}`
    );
  }
}
