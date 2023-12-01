import { alert, handleInputs } from "../utilities/index.js";
import { API_URLS, headers, getListing, editListing } from "../api/index.js";

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

    handleInputs(
      "editMediaInputsContainer",
      "Edit",
      "Media",
      "media URL",
      true
    );
    handleInputs("editTagInputsContainer", "Edit", "Tag", "tag");

    try {
      const form = document.querySelector("#editListingModal form");
      const listing = await getListing(id);
      const titleInput = document.querySelector("#editListingTitle");
      const descriptionInput = document.querySelector(
        "#editListingDescription"
      );

      titleInput.value = listing.title;
      descriptionInput.value = listing.description;

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
          const editedListing = await editListing(
            id,
            titleInput.value,
            descriptionInput.value
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
      alert(
        "danger",
        "An error occured when attempting to edit listing",
        ".alert-absolute",
        4000
      );
    }
  }

  //   if (targetElement.classList.contains("btn-edit")) {
  //     const id = targetElement.dataset.id;

  //     handleInputs(
  //       "editMediaInputsContainer",
  //       "Edit",
  //       "Media",
  //       "media URL",
  //       true
  //     );
  //     handleInputs("editTagInputsContainer", "Edit", "Tag", "tag");

  //     try {
  //       const form = document.querySelector("#editListingModal form");
  //       const listing = await getListing(id);
  //       const titleInput = document.querySelector("#editListingTitle");
  //       const descriptionInput = document.querySelector(
  //         "#editListingDescription"
  //       );

  //       const mediaContainer = document.getElementById(
  //         "editMediaInputsContainer"
  //       );
  //       listing.media.forEach((mediaUrl) => {
  //         createInputField(mediaContainer, mediaUrl, "media URL", true);
  //       });

  //       const tagContainer = document.getElementById("editTagInputsContainer");
  //       listing.tags.forEach((tag) => {
  //         createInputField(tagContainer, tag, "tag", false);
  //       });
  //     } catch {
  //       console.log("An error occured");
  //     }
  //   }
}
