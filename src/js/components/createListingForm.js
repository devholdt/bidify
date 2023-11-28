import { createListingEvent } from "../api/index.js";
import { handleInputs } from "../utilities/index.js";

export const createListingForm = () => {
  document
    .querySelector("form#createListingForm")
    .addEventListener("submit", createListingEvent);

  // Handles adding and removing additional media and tag inputs
  handleInputs("mediaInputsContainer", "Media", "media URL", true);
  handleInputs("tagInputsContainer", "Tag", "tag");

  // Sets the default date input value to local date + one day
  const todayDate = new Date();
  const tomorrowDate = todayDate.setDate(todayDate.getDate() + 1);
  document.getElementById("createListingDate").valueAsDate = new Date(
    tomorrowDate
  );

  // Button to clear the media URL input(s)
  const clearButton = document.querySelector(".clear-button");
  clearButton.addEventListener("click", () => {
    document.querySelector("input[name='media']").value = "";
  });
};
