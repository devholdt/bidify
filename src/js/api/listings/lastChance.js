import { getListings } from "./fetch.js";
import { sortListings } from "../../utilities/index.js";
import { createCard } from "./cardUtils.js";

export async function lastChance() {
  const listings = await getListings();
  const sortedListings = sortListings(listings, "endsAt");

  sortedListings
    .slice(0, 3)
    .forEach((listing) => createCard(listing, ".last-chance"));
}
