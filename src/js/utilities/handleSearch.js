import { getListings } from "../api/index.js";
import { createCard, placeholderCard } from "../components/index.js";
import { alert } from "./index.js";

const searchInput = document.querySelector("#searchListings");
const searchResults = document.querySelector(".search-results");
const spanResults = document.querySelector(".span-results");
const buttonMoreResults = document.querySelector("#buttonMoreResults");
const listingsContainer = document.querySelector(".listings");

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
      spanResults.innerHTML = `Showing (${filteredListings.length}) results`;
    }
  } catch {
    alert(
      "danger",
      "An error occurred when attempting to search for listing(s).",
      ".listings",
      null
    );
  }
}

searchInput.addEventListener("input", async () => {
  const value = searchInput.value.trim();

  if (value.length > 0) {
    spanResults.innerHTML = "";
    searchResults.style.display = "flex";
    buttonMoreResults.style.display = "none";
    listingsContainer.style.display = "none";
    searchResults.innerHTML = placeholderCard;

    setTimeout(() => {
      handleSearch(value);
    }, 1000);
  } else {
    buttonMoreResults.style.display = "flex";
    listingsContainer.style.display = "flex";
    spanResults.innerHTML = "Showing (12) results";
    searchResults.style.display = "none";
  }
});
