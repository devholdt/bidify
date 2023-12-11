import { getListings } from "./fetch.js";
import { createCard, placeholderCard } from "../../components/index.js";
import { alert } from "../../utilities/index.js";

function display(listings) {
  const listingsContainer = document.querySelector(".listings");
  const button = document.querySelector("#buttonMoreResults");
  const searchResults = document.querySelector(".search-results");
  const searchInput = document.querySelector("#searchListings");
  listingsContainer.innerHTML = "";
  listingsContainer.style.display = "flex";
  searchResults.innerHTML = "";
  button.style.display = "flex";
  searchInput.value = "";

  listings
    .map((listing) => {
      return listing.title === "" ? { ...listing, title: "Listing" } : listing;
    })
    .forEach((listing) => createCard(listing, ".listings"));
}

export async function displayListings() {
  const sortListingsContainer = document.querySelector("#sortListings");
  const listingsContainer = document.querySelector(".listings");
  const button = document.querySelector("#buttonMoreResults");
  const spanResults = document.querySelector(".span-results");

  listingsContainer.innerHTML = "";

  const INITIAL_LIMIT = 12;
  let limit = INITIAL_LIMIT;
  let currentSort = "Latest";
  let allListings = [];

  for (let i = 0; i < INITIAL_LIMIT; i++) {
    listingsContainer.innerHTML += placeholderCard;
  }

  async function fetchAllListings() {
    try {
      allListings = await getListings({ sort: "&sort=created" });
    } catch {
      alert(
        "danger",
        "An error occured when attempting to fetch all listings",
        ".alert-absolute",
        null
      );
    }
  }

  function sortAndDisplayListings() {
    let sortedListings = [...allListings];

    switch (currentSort) {
      case "Latest":
        sortedListings = [...allListings].sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
        break;
      case "Popular":
        sortedListings = [...allListings].sort(
          (a, b) => b._count.bids - a._count.bids
        );
        break;
      case "Title A-Z":
        sortedListings = [...allListings].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "Title Z-A":
        sortedListings = [...allListings].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      case "Bid high-low":
        sortedListings = [...allListings].sort((a, b) => {
          let maxBidA = a.bids.reduce(
            (max, bid) => (bid.amount > max ? bid.amount : max),
            0
          );
          let maxBidB = b.bids.reduce(
            (max, bid) => (bid.amount > max ? bid.amount : max),
            0
          );

          return maxBidB - maxBidA;
        });
        break;
      case "Bid low-high":
        sortedListings = [...allListings]
          .filter((listing) => listing.bids.length > 0)
          .sort((a, b) => {
            let maxBidA = a.bids.reduce(
              (max, bid) => (bid.amount > max ? bid.amount : max),
              0
            );
            let maxBidB = b.bids.reduce(
              (max, bid) => (bid.amount > max ? bid.amount : max),
              0
            );

            return maxBidA - maxBidB;
          });
        break;
      case "Ends soon":
        sortedListings = [...allListings].sort(
          (a, b) => new Date(a.endsAt) - new Date(b.endsAt)
        );
        break;
    }

    display(sortedListings.slice(0, limit));
  }

  await fetchAllListings();
  sortAndDisplayListings();

  spanResults.innerHTML = `(${limit})`;

  sortListingsContainer.addEventListener("change", (event) => {
    limit = INITIAL_LIMIT;
    spanResults.innerHTML = `(${limit})`;
    currentSort = event.target.value;
    sortAndDisplayListings();
  });

  button.addEventListener("click", () => {
    limit += INITIAL_LIMIT;
    sortAndDisplayListings();

    spanResults.innerHTML = `(${limit})`;

    if (limit >= allListings.length) {
      button.style.display = "none";
    }
  });
}
