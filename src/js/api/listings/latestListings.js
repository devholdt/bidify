import { getListings } from "./fetch.js";
import { sortListings } from "../../utilities/index.js";
import { createCard } from "../../components/listingCards.js";

export async function latestListings() {
  const listings = await getListings();
  const sortedListings = sortListings(listings, "created");

  sortedListings
    .slice(0, 3)
    .forEach((listing) => createCard(listing, ".latest-listings"));
}
