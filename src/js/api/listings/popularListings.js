import { getListings } from "./fetch.js";
import { sortListings } from "../../utilities/index.js";
import { createCard } from "../../components/listingCards.js";

export async function popularListings() {
  const listings = await getListings();
  const sortedListings = sortListings(listings, "bids");

  sortedListings
    .slice(0, 3)
    .forEach((listing) => createCard(listing, ".popular-listings"));
}
