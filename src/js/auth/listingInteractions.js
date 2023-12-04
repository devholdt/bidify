import { alert, handleInputs, collectInputValues } from "../utilities/index.js";
import { API_URLS, getListing, editListing } from "../api/index.js";

export async function listingInteractions(event) {
  let targetElement = event.target;

  if (
    targetElement.tagName === "SPAN" &&
    targetElement.parentElement.classList.contains("btn")
  ) {
    targetElement = targetElement.parentElement;
  }

  if (targetElement.classList.contains("btn-delete")) {
    if (confirm("Are you sure you want to delete this listing?") === true) {
      const id = targetElement.dataset.id;
      try {
        console.log("Listing successfully deleted");
        const response = await fetch(`${API_URLS.LISTINGS}/${id}`);

        if (response.ok) {
          location.reload();
        }
      } catch {
        alert(
          "danger",
          "An error occured when attempting to delete listing",
          ".alert-absolute",
          4000
        );
      }
    }
  }

  if (targetElement.classList.contains("btn-edit")) {
    const id = targetElement.dataset.id;

    const editModal = document.getElementById("editListingModal");
    const form = document.querySelector("#editListingModal form");
    const listing = await getListing(id);
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

    editModal.addEventListener("hidden.bs.modal", resetInputs);

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

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const mediaValues = collectInputValues("editMediaInputsContainer");
        const tagValues = collectInputValues("editTagInputsContainer");

        try {
          const editedListing = await editListing(
            id,
            titleInput.value,
            descriptionInput.value,
            mediaValues,
            tagValues
          );

          if (editedListing) {
            alert(
              "success",
              "Listing edited successfully!",
              ".alert-absolute",
              2000,
              false
            );

            setTimeout(() => {
              location.reload();
            }, 2000);
          }
        } catch {
          alert(
            "danger",
            "An error occured when attempting to edit listing",
            ".alert-absolute",
            4000
          );
        }
      });
    } catch {
      console.log("An error occured");
    }
  }
}
