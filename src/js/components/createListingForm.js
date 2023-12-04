import { createListingEvent } from "../events/index.js";
import { handleInputs } from "../utilities/index.js";

export const createListingForm = () => {
  const form = document.querySelector("form#createListingForm");
  const mediaInputsContainer = document.getElementById(
    "createMediaInputsContainer"
  );

  form.addEventListener("submit", createListingEvent);

  handleInputs(
    "createMediaInputsContainer",
    "Create",
    "Media",
    "media URL",
    true,
    4
  );
  handleInputs("createTagInputsContainer", "Create", "Tag", "tag", false, 6);

  const todayDate = new Date();
  const tomorrowDate = todayDate.setDate(todayDate.getDate() + 1);
  document.getElementById("createListingDate").valueAsDate = new Date(
    tomorrowDate
  );

  mediaInputsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("clear-button")) {
      event.target.closest(".input-group").querySelector("input").value = "";
    }
  });
};
