import { getListings } from "../api/index.js";
import { createCard, placeholderCard } from "../components/index.js";
import { alert } from "./index.js";

const searchInput = document.querySelector("#searchListings");
const searchResults = document.querySelector(".search-results");
const spanResults = document.querySelector(".span-results");
const buttonMoreResults = document.querySelector("#buttonMoreResults");
const listingsContainer = document.querySelector(".listings");
const sortSelect = document.querySelector("#sortListings");

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

    searchResults.innerHTML = "";

    if (filteredListings.length === 0) {
      searchResults.innerHTML = `<p class="text-center fs-5">No results. Please try a different search term.</p>`;
    } else {
      filteredListings.forEach((listing) =>
        createCard(listing, ".search-results")
      );
      spanResults.innerHTML = `(${filteredListings.length})`;
    }

    spanResults.innerHTML =
      value.length === 0 ? "(12)" : `(${filteredListings.length})`;
  } catch {
    alert(
      "danger",
      "An error occurred when attempting to search for listing(s).",
      ".listings",
      null
    );
  }
}

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
