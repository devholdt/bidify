import { getListings } from "../api/index.js";
import { createCard } from "../components/index.js";
import { alert } from "./index.js";

const searchInput = document.querySelector("#searchListings");
const searchResults = document.querySelector(".search-results");
const spanResults = document.querySelector(".span-results");

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
  } catch (error) {
    alert(
      "danger",
      "An error occurred when attempting to search listings",
      ".listings",
      null
    );
    throw new Error(
      `An error occured when attempting to search listings: ${error}`
    );
  }
}
