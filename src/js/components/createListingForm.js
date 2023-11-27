import { createListingEvent } from "../api/index.js";

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

function handleInputs(containerElement, type, placeholder, includeButton) {
  const container = document.getElementById(containerElement);

  document.getElementById(`add${type}Button`).addEventListener("click", () => {
    if (container.children.length === 4) {
      return;
    }

    const newInput = document.createElement("div");
    newInput.classList.add("input-group", "mb-2");

    let inputHtml = `<input type="text" class="form-control rounded-end" placeholder="${placeholder}">`;

    if (includeButton) {
      inputHtml += `
        <button type="button" 
        class="btn btn-outline-dark btn-sm rounded-end input-group-text clear-button">
            Clear
        </button>`;
    }

    inputHtml += `
      <button type="button" class="btn border-0 input-group-text text-danger remove-input">
        <span class="material-icons">remove</span>
      </button>`;

    newInput.innerHTML = inputHtml;

    container.appendChild(newInput);

    const removeButton = newInput.querySelector(".remove-input");
    if (removeButton) {
      removeButton.addEventListener("click", (event) => {
        container.removeChild(event.target.closest(".input-group"));
      });
    }

    if (includeButton) {
      const clearButton = newInput.querySelector(".clear-button");
      if (clearButton) {
        clearButton.addEventListener("click", () => {
          newInput.querySelector("input[type='text']").value = "";
        });
      }
    }
  });
}

// -----------------------------------------------------------------------------

function handleMediaInputs() {
  document.getElementById("addMediaButton").addEventListener("click", () => {
    const container = document.getElementById("mediaInputsContainer");
    const newInput = document.createElement("div");
    newInput.classList.add("input-group", "mb-2");
    newInput.innerHTML = `
          <input type="text" class="form-control" name="media" placeholder="media URL">

          <button type="button"
              class="btn btn-outline-dark btn-sm rounded-end input-group-text"
              id="clearUrlButton">clear</button>

          <button type="button"
              class="btn border-0 input-group-text text-danger remove-media">
              <span class="material-icons">remove</span>
          </button>`;

    if (container.children.length === 4) {
      return;
    } else {
      container.appendChild(newInput);
    }

    const removeMediaButton = newInput.querySelector(".remove-media");

    removeMediaButton.addEventListener("click", (event) => {
      container.removeChild(event.target.parentElement.parentElement);
    });
  });
}

function handleTagInputs() {
  document.getElementById("addTagButton").addEventListener("click", () => {
    const container = document.getElementById("tagInputsContainer");
    const newInput = document.createElement("div");
    newInput.classList.add("input-group", "mb-2");
    newInput.innerHTML = `
          <input type="text" class="form-control rounded-end" name="tags" placeholder="tag">

          <button type="button"
              class="btn border-0 input-group-text text-danger remove-tag">
              <span class="material-icons">remove</span>
          </button>`;

    if (container.children.length === 4) {
      return;
    } else {
      container.appendChild(newInput);
    }

    const removeTagButton = newInput.querySelector(".remove-tag");
    removeTagButton.addEventListener("click", (event) => {
      container.removeChild(event.target.parentElement.parentElement);
    });
  });
}
