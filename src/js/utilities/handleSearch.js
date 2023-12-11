import { getListings } from "../api/index.js";
import { createCard } from "../components/index.js";

const searchInput = document.querySelector("#searchListings");
const buttonSearch = document.querySelector(".btn-search");
const buttonMoreResults = document.querySelector("#buttonMoreResults");
const searchResults = document.querySelector(".search-results");
const listingsContainer = document.querySelector(".listings");

export async function handleSearch(value) {
  value = searchInput.value;

  try {
    const listings = await getListings({ tag: `&_tag=${value}` });
    searchResults.innerHTML = "";

    if (listings.length === 0) {
      searchResults.innerHTML = "No results. Please try another search term.";
      return;
    }

    listings.forEach((listing) => createCard(listing, ".search-results"));
    searchInput.value = "";
  } catch (error) {
    console.log("handleSearch: ");
    console.error(error);
  }
}

searchInput.addEventListener("search", () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm.length === 0) {
    return;
  }

  listingsContainer.innerHTML = "";
  buttonMoreResults.style.display = "none";
  searchResults.style.display = "flex";

  handleSearch(searchTerm);
});

buttonSearch.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm.length === 0) {
    return;
  }

  listingsContainer.innerHTML = "";
  searchResults.style.display = "block";

  handleSearch(searchTerm);
});
