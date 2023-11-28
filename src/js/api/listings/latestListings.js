import { getListings } from "./index.js";
import { createCard } from "../../components/index.js";

export async function latestListings() {
  const listings = await getListings({ sort: "&sort=created" });

  listings
    .slice(0, 3)
    .forEach((listing) => createCard(listing, ".latest-listings"));
}
