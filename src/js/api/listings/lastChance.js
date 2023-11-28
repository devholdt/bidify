import { getListings } from "./index.js";
import { createCard } from "../../components/index.js";

export async function lastChance() {
  const listings = await getListings({
    sortOrder: "asc",
    sort: "&sort=endsAt",
  });

  listings
    .slice(0, 3)
    .forEach((listing) => createCard(listing, ".last-chance"));
}
