import { getListings } from "../api/index.js";
import { createCard, placeholderCard } from "../components/index.js";
import { alert } from "./index.js";

const searchInput = document.querySelector("#searchListings");
const buttonMoreResults = document.querySelector("#buttonMoreResults");
const searchResults = document.querySelector(".search-results");
const listingsContainer = document.querySelector(".listings");

let typingTimer;
const doneTypingInterval = 1000;

function debounce(func, delay) {
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

export async function handleSearch(value) {
  value = searchInput.value.trim();

  try {
    const listings = await getListings({ sort: "&sort=created" });
    const filteredListings = listings.filter((listing) => {
      const lowercaseValue = value.toLowerCase().trim();

      return (
        listing.title.toLowerCase().trim().includes(lowercaseValue) ||
        listing.tags.some((tag) => tag.toLowerCase().includes(lowercaseValue))
      );
    });

    if (filteredListings.length === 0) {
      searchResults.innerHTML = `<p class="text-center fs-5">No results. Please try a different search term.</p>`;
    } else {
      searchResults.innerHTML = "";
      filteredListings.forEach((listing) =>
        createCard(listing, ".search-results")
      );
    }
  } catch {
    alert(
      "danger",
      "An error occurred when attempting to search for listing(s)."
    );
  }
}

const debouncedSearch = debounce(handleSearch, doneTypingInterval);

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.trim();

  if (value) {
    listingsContainer.style.display = "none";
    buttonMoreResults.style.display = "none";
    searchResults.innerHTML = placeholderCard;
    debouncedSearch(value);
  } else {
    searchResults.innerHTML = "";
    listingsContainer.style.display = "flex";
    buttonMoreResults.style.display = "flex";
  }
});
