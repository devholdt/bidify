export function handleInputs(
  containerElement,
  request,
  type,
  placeholder,
  includeButton,
  maxCount,
  initialValues = []
) {
  const container = document.getElementById(containerElement);
  const addButton = document.getElementById(`add${request}${type}Button`);

  const createInputField = (value = "") => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    let inputHtml = `<input type="text" class="form-control" placeholder="${placeholder}" value="${value}" name="${type.toLowerCase()}">`;

    if (includeButton) {
      inputHtml += `
        <button type="button" class="btn btn-outline-dark px-1 btn-sm input-group-text clear-button">clear</button>`;
    }

    inputHtml += `
    <button type="button" class="btn ps-1 pe-0 border-0 input-group-text text-danger remove-input">
      <span class="material-icons">remove</span>
    </button>`;

    inputGroup.innerHTML = inputHtml;

    const removeButton = inputGroup.querySelector(".remove-input");
    removeButton.addEventListener("click", (event) => {
      container.removeChild(event.target.closest(".input-group"));
    });

    if (includeButton) {
      const clearButton = inputGroup.querySelector(".clear-button");
      clearButton.addEventListener("click", () => {
        inputGroup.querySelector("input[name='media']").value = "";
      });
    }

    container.appendChild(inputGroup);
  };

  let startIndex = container.querySelector("input[type='text']").value ? 1 : 0;

  initialValues.slice(startIndex).forEach((value) => createInputField(value));

  if (!addButton.dataset.listenerAdded) {
    addButton.addEventListener("click", () => {
      if (container.querySelectorAll(".input-group").length < maxCount) {
        createInputField();
      }
    });
    addButton.dataset.listenerAdded = "true";
  }
}

export function collectInputValues(containerId) {
  const values = [];

  const container = document.getElementById(containerId);

  container.querySelectorAll("input[type='text']").forEach((input) => {
    if (input.value.trim() !== "") {
      values.push(input.value.trim());
    }
  });

  return values;
}