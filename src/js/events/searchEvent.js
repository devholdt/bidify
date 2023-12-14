import { handleSearch } from "../utilities/index.js";
import { placeholderCard } from "../components/index.js";

export function searchEvent() {
  const searchInput = document.querySelector("#searchListings");
  const searchResults = document.querySelector(".search-results");
  const spanResults = document.querySelector(".span-results");
  const buttonMoreResults = document.querySelector("#buttonMoreResults");
  const listingsContainer = document.querySelector(".listings");
  const sortSelect = document.querySelector("#sortListings");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.trim();

      if (value.length > 0) {
        buttonMoreResults.style.display = "none";
        listingsContainer.style.display = "none";
        spanResults.innerHTML = "(...)";
        searchResults.style.display = "flex";
        searchResults.innerHTML = placeholderCard;
        sortSelect.value = "Latest";

        setTimeout(() => {
          handleSearch(value);
        }, 1000);
      } else {
        buttonMoreResults.style.display = "flex";
        listingsContainer.style.display = "flex";
        spanResults.innerHTML = "(12)";
        searchResults.style.display = "none";
        sortSelect.dispatchEvent(new Event("change"));
      }
    });
  }
}
