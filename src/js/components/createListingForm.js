import { createListingEvent } from "../api/index.js";
import { handleInputs } from "../utilities/index.js";

export const createListingForm = () => {
  document
    .querySelector("form#createListingForm")
    .addEventListener("submit", createListingEvent);

  handleInputs("mediaInputsContainer", "Media", "media URL", true);
  handleInputs("tagInputsContainer", "Tag", "tag");

  const clearButton = document.querySelector(".clear-button");
  clearButton.addEventListener("click", () => {
    document.querySelector("input[name='media']").value = "";
  });
};
