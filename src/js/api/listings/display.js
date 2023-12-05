import { getListings } from "./fetch.js";
import { createCard } from "../../components/createCard.js";

export async function displayListings() {
  const sortListings = document.querySelector("#sortListings");
  const listingsContainer = document.querySelector(".listings");
  const listings = await getListings({ sort: "&sort=created" });

  listings.slice(0, 12).forEach((listing) => createCard(listing, ".listings"));

  sortListings.addEventListener("change", async (event) => {
    if (event.target.value === "Latest") {
      listingsContainer.innerHTML = "";

      const listings = await getListings({ sort: "&sort=created" });

      listings
        .slice(0, 12)
        .forEach((listing) => createCard(listing, ".listings"));
    } else if (event.target.value === "Popular") {
      listingsContainer.innerHTML = "";

      const listings = await getListings({
        sortOrder: "asc",
        sort: "&sort=created",
      });

      const sortedListings = listings.sort(
        (a, b) => b._count.bids - a._count.bids
      );

      sortedListings
        .slice(0, 12)
        .forEach((listing) => createCard(listing, ".listings"));
    } else if (event.target.value === "Title A - Z") {
      listingsContainer.innerHTML = "";

      const listings = await getListings({
        sortOrder: "asc",
        sort: "&sort=title",
      });

      listings
        .slice(0, 12)
        .forEach((listing) => createCard(listing, ".listings"));
    } else if (event.target.value === "Title Z - A") {
      listingsContainer.innerHTML = "";

      const listings = await getListings({
        sortOrder: "desc",
        sort: "&sort=title",
      });

      listings
        .slice(0, 12)
        .forEach((listing) => createCard(listing, ".listings"));
    }
  });
}
