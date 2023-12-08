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

  let allListingsByCreated = await getListings({ sort: "&sort=created" });
  let allListingsByEndsAt = await getListings({
    sortOrder: "asc",
    sort: "&sort=endsAt",
  });

  display(listingsContainer, allListingsByCreated.slice(0, 12));

  sortListingsContainer.addEventListener("change", async (event) => {
    let sortedListings;

    switch (event.target.value) {
      case "Latest":
        sortedListings = allListingsByCreated;
        break;
      case "Popular":
        sortedListings = [...allListingsByCreated].sort(
          (a, b) => b._count.bids - a._count.bids
        );
        break;
      case "Title A-Z":
        sortedListings = [...allListingsByCreated].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "Title Z-A":
        sortedListings = [...allListingsByCreated].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      case "Bid high-low":
        sortedListings = [...allListingsByCreated].sort((a, b) => {
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
        sortedListings = [...allListingsByCreated]
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
        sortedListings = allListingsByEndsAt;
        break;
      default:
        sortedListings = allListings.slice();
    }

    display(listingsContainer, sortedListings.slice(0, 12));
  });
}
