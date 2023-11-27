export async function createListing() {
  const form = document.querySelector("#createListingForm");
  const titleInput = document.querySelector("#createListingTitle");
  const endDateInput = document.querySelector("#createListingDate");
  const descriptionInput = document.querySelector("#createListingDescription");
  const tagsInput = document.querySelector("#createListingTags");

  handleMediaInputs();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const endDate = endDateInput.value;
    const description = descriptionInput.value;
    const tags = tagsInput.value.split(", ").map((tag) => tag.trim());

    const mediaInputs = document.querySelectorAll(
      "#mediaInputsContainer input"
    );
    const media = Array.from(mediaInputs).map((input) => input.value);

    console.log("Title: ", title);
    console.log("End date: ", endDate);
    console.log("Description: ", description);
    console.log("Tags: ", tags);
    console.log("Media: ", media);
  });
}

function handleMediaInputs() {
  document.getElementById("addMediaButton").addEventListener("click", () => {
    const container = document.getElementById("mediaInputsContainer");
    const newInput = document.createElement("div");
    newInput.setAttribute("class", "input-group mb-2");
    newInput.innerHTML = `
        <input type="text" class="form-control" placeholder="media URL">

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
