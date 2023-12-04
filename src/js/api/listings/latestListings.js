import { getListings } from "./index.js";
import { createCard } from "../../components/index.js";

export async function latestListings() {
  const listings = await getListings({ sort: "&sort=created" });

  listings
    .slice(0, 3)
    .forEach((listing) => createCard(listing, ".latest-listings"));

  const container = document.querySelector(".latest-listings");
  const cards = Array.from(container.children);

  cards.forEach((card) => {
    card.classList.remove("col-12", "col-sm-6", "col-lg-4");
    card.classList.add("col-4");
  });
}
