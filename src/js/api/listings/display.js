import { getListings } from "./fetch.js";
import { sortListings } from "../../utilities/index.js";
import { createCard } from "../../components/listingCards.js";

export async function displayListings() {
  const listings = await getListings();
  const sortedListings = sortListings(listings, "created");

  sortedListings
    .slice(0, 12)
    .forEach((listing) => createCard(listing, ".listings"));
}
