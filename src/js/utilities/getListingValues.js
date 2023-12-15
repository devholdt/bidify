import { handleInputs, removeQueryString, setQueryString } from "./index.js";
import { getSingleListing } from "../api/index.js";
import { alert } from "./index.js";

document.addEventListener("reload", removeQueryString("id"));

export async function getListingValues(event) {
  let targetElement = event.target;

  if (
    targetElement.tagName === "SPAN" &&
    targetElement.parentElement.classList.contains("btn")
  ) {
    targetElement = targetElement.parentElement;
  }

  if (targetElement.classList.contains("btn-edit")) {
    const id = targetElement.dataset.id;

    setQueryString("id", id);

    const editModal = document.getElementById("editListingModal");
    const listing = await getSingleListing(id);
    const titleInput = document.querySelector("#editListingTitle");
    const descriptionInput = document.querySelector("#editListingDescription");
    const mediaContainer = document.getElementById("editMediaInputsContainer");
    const tagContainer = document.getElementById("editTagInputsContainer");

    mediaContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("clear-button")) {
        event.target.closest(".input-group").querySelector("input").value = "";
      }
    });

    function resetInputs() {
      const resetContainer = (containerId) => {
        const container = document.getElementById(containerId);
        while (container.children.length > 1) {
          container.removeChild(container.lastChild);
        }
        const firstInput = container.querySelector('input[type="text"]');
        if (firstInput) firstInput.value = "";
      };

      resetContainer("editMediaInputsContainer");
      resetContainer("editTagInputsContainer");
    }

    editModal.addEventListener("hide.bs.modal", () => {
      removeQueryString("id");
      resetInputs();
    });

    try {
      titleInput.value = listing.title;
      descriptionInput.value = listing.description;

      if (listing.media.length > 0) {
        mediaContainer.querySelector("input[type='text']").value =
          listing.media[0];
      }

      if (listing.tags.length > 0) {
        tagContainer.querySelector("input[type='text']").value =
          listing.tags[0];
      }

      handleInputs(
        "editMediaInputsContainer",
        "Edit",
        "Media",
        "media URL",
        true,
        4,
        listing.media
      );

      handleInputs(
        "editTagInputsContainer",
        "Edit",
        "Tag",
        "tag",
        false,
        6,
        listing.tags
      );
    } catch (error) {
      alert(
        "danger",
        "An error occured when attempting to get listing values",
        ".alert-editlisting",
        null
      );
      console.error(
        "An error occured when attempting to get listing values: ",
        error
      );
    }
  }
}
