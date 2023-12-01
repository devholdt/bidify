export function handleInputs(
  containerElement,
  request,
  type,
  placeholder,
  includeButton
) {
  const container = document.getElementById(containerElement);

  document
    .getElementById(`add${request}${type}Button`)
    .addEventListener("click", () => {
      if (type === "Media" && container.children.length === 4) {
        return;
      } else if (type === "Tag" && container.children.length === 6) {
        return;
      }

      const newInput = document.createElement("div");
      newInput.classList.add("input-group", "new-input");

      let inputHtml = `<input type="text" class="form-control" placeholder="${placeholder}">`;

      if (includeButton) {
        inputHtml += `
          <button type="button" 
          class="btn btn-outline-dark px-1 btn-sm input-group-text clear-button">
              clear
          </button>`;
      }

      inputHtml += `
        <button type="button" class="btn ps-1 pe-0 border-0 input-group-text text-danger remove-input">
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

// function createInputField(container, value, placeholder, includeClearButton) {
//   const inputGroup = document.createElement("div");
//   inputGroup.classList.add("input-group");

//   let inputHtml = `<input type="text" class="form-control" placeholder="${placeholder}" value="${value}">`;

//   if (includeClearButton) {
//     inputHtml += `
//       <button type="button" class="btn btn-outline-dark px-1 btn-sm input-group-text clear-button">clear</button>`;
//   }

//   inputHtml += `
//   <button type="button" class="btn ps-1 pe-0 border-0 input-group-text text-danger remove-input">
//     <span class="material-icons">remove</span>
//   </button>`;

//   inputGroup.innerHTML = inputHtml;

//   // Add event listeners for remove and clear buttons
//   const removeButton = inputGroup.querySelector(".remove-input");
//   removeButton.addEventListener("click", (event) => {
//     container.removeChild(event.target.closest(".input-group"));
//   });

//   if (includeClearButton) {
//     const clearButton = inputGroup.querySelector(".clear-button");
//     clearButton.addEventListener("click", () => {
//       inputGroup.querySelector("input[type='text']").value = "";
//     });
//   }

//   container.appendChild(inputGroup);
// }
