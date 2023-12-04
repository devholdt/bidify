import { getListings } from "./fetch.js";
import { createCard } from "../../components/createCard.js";

export async function displayListings() {
  const listings = await getListings({ sort: "&sort=created" });

  listings.slice(0, 12).forEach((listing) => createCard(listing, ".listings"));
}
