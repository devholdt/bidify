import { getListings } from "./fetch.js";
import { createCard } from "../../components/index.js";

function display(container, listings) {
  container.innerHTML = "";
  listings
    .filter((listing) => listing.title && listing.title.trim() !== "")
    .forEach((listing) => createCard(listing, ".listings"));
}

export async function displayListings() {
  const sortListingsContainer = document.querySelector("#sortListings");
  const listingsContainer = document.querySelector(".listings");

  let allListings = await getListings({ sort: "&sort=created" });

  display(listingsContainer, allListings.slice(0, 12));

  sortListingsContainer.addEventListener("change", (event) => {
    let sortedListings;

    switch (event.target.value) {
      case "Latest":
        sortedListings = allListings.slice();
        break;
      case "Popular":
        sortedListings = [...allListings].sort(
          (a, b) => b._count.bids - a._count.bids
        );
        break;
      case "Title A - Z":
        sortedListings = [...allListings].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "Title Z - A":
        sortedListings = [...allListings].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      default:
        sortedListings = allListings.slice();
    }

    display(listingsContainer, sortedListings.slice(0, 12));
  });
}
