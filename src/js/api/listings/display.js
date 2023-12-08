import { getListings } from "./fetch.js";
import { createCard } from "../../components/index.js";
import { alert } from "../../utilities/index.js";

function display(container, listings) {
  container.innerHTML = "";

  listings
    .filter((listing) => listing.title && listing.title.trim() !== "")
    .forEach((listing) => createCard(listing, ".listings"));
}

export async function displayListings() {
  const sortListingsContainer = document.querySelector("#sortListings");
  const listingsContainer = document.querySelector(".listings");
  const button = document.querySelector("#buttonMoreResults");
  const spanResults = document.querySelector(".span-results");

  const INITIAL_LIMIT = 12;
  let limit = INITIAL_LIMIT;
  let currentSort = "Latest";
  let allListings = [];

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

    display(listingsContainer, sortedListings.slice(0, limit));
  }

  await fetchAllListings();
  sortAndDisplayListings();

  spanResults.innerHTML = `Showing (${limit}) results`;

  sortListingsContainer.addEventListener("change", (event) => {
    limit = INITIAL_LIMIT;
    spanResults.innerHTML = `Showing (${limit}) results`;
    currentSort = event.target.value;
    sortAndDisplayListings();
  });

  button.addEventListener("click", () => {
    limit += INITIAL_LIMIT;
    sortAndDisplayListings();

    spanResults.innerHTML = `Showing (${limit}) results`;

    if (limit >= allListings.length) {
      button.style.display = "none";
    }
  });
}

// export async function displayListings() {
//   const sortListingsContainer = document.querySelector("#sortListings");
//   const listingsContainer = document.querySelector(".listings");

//   let limit = 12;
//   let offset = 0;

//   let allListingsByCreated = await getListings({
//     sort: "&sort=created",
//     limit: `&limit=${limit}`,
//     offset: `&offset=${offset}`,
//   });
//   let allListingsByEndsAt = await getListings({
//     sortOrder: "asc",
//     sort: "&sort=endsAt",
//     limit: `&limit=${limit}`,
//     offset: `&offset=${offset}`,
//   });

//   display(listingsContainer, allListingsByCreated);

//   sortListingsContainer.addEventListener("change", async (event) => {
//     let sortedListings;

//     switch (event.target.value) {
// case "Latest":
//   sortedListings = allListingsByCreated;
//   break;
// case "Popular":
//   sortedListings = [...allListingsByCreated].sort(
//     (a, b) => b._count.bids - a._count.bids
//   );
//   break;
// case "Title A-Z":
//   sortedListings = [...allListingsByCreated].sort((a, b) =>
//     a.title.localeCompare(b.title)
//   );
//   break;
// case "Title Z-A":
//   sortedListings = [...allListingsByCreated].sort((a, b) =>
//     b.title.localeCompare(a.title)
//   );
//   break;
// case "Bid high-low":
//   sortedListings = [...allListingsByCreated].sort((a, b) => {
//     let maxBidA = a.bids.reduce(
//       (max, bid) => (bid.amount > max ? bid.amount : max),
//       0
//     );
//     let maxBidB = b.bids.reduce(
//       (max, bid) => (bid.amount > max ? bid.amount : max),
//       0
//     );

//     return maxBidB - maxBidA;
//   });
//   break;
// case "Bid low-high":
//   sortedListings = [...allListingsByCreated]
//     .filter((listing) => listing.bids.length > 0)
//     .sort((a, b) => {
//       let maxBidA = a.bids.reduce(
//         (max, bid) => (bid.amount > max ? bid.amount : max),
//         0
//       );
//       let maxBidB = b.bids.reduce(
//         (max, bid) => (bid.amount > max ? bid.amount : max),
//         0
//       );

//       return maxBidA - maxBidB;
//     });
//   break;
// case "Ends soon":
//   sortedListings = allListingsByEndsAt;
//   break;
//       default:
//         sortedListings = allListings.slice();
//     }

//     display(listingsContainer, sortedListings);
//   });

//   // const button = document.querySelector("#buttonMoreResults");

//   // button.addEventListener("click", async () => {
//   //   limit = limit + 12;

//   //   if (limit === 96) {
//   //     limit = limit + 4;
//   //   }

//   //   display(
//   //     listingsContainer,
//   //     await getListings({
//   //       sort: "&sort=created",
//   //       limit: `&limit=${limit}`,
//   //       offset: `&offset=${offset}`,
//   //     })
//   //   );

//   //   if (limit === 100) {
//   //     button.style.display = "none";
//   //   }
//   // });
// }
