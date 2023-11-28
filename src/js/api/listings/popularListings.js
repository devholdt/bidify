import { getListings } from "./index.js";
import { createCard } from "../../components/index.js";

export async function popularListings() {
  const listings = await getListings({
    sortOrder: "asc",
    sort: "&sort=created",
  });
  const sortedListings = listings.sort((a, b) => b._count.bids - a._count.bids);

  sortedListings
    .slice(0, 3)
    .forEach((listing) => createCard(listing, ".popular-listings"));
}
