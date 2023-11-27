export function handleInputs(
  containerElement,
  type,
  placeholder,
  includeButton
) {
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
