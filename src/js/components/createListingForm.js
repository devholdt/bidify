import { createListingEvent } from "../api/index.js";
import { manageInputFields } from "../utilities/index.js";

export const createListingForm = () => {
  document
    .querySelector("form#createListingForm")
    .addEventListener("submit", createListingEvent);

  manageInputFields(
    "editMediaInputsContainer",
    "Edit",
    "Media",
    "media URL",
    true,
    4
  );
  manageInputFields("editTagInputsContainer", "Edit", "Tag", "tag", false, 6);

  const todayDate = new Date();
  const tomorrowDate = todayDate.setDate(todayDate.getDate() + 1);
  document.getElementById("createListingDate").valueAsDate = new Date(
    tomorrowDate
  );

  const clearButton = document.querySelector(".clear-button");
  clearButton.addEventListener("click", () => {
    document.querySelector("input[name='media']").value = "";
  });
};
