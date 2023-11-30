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

  const container = document.querySelector(".last-chance");
  const cards = Array.from(container.children);

  cards.forEach((card) => {
    card.classList.remove("col-12", "col-sm-6", "col-lg-4");
    card.classList.add("col-4");
  });
}
