import { getListings } from "./index.js";
import { createCard } from "../../components/index.js";

export async function popularListings() {
  const container = document.querySelector(".popular-listings");

  const listings = await getListings({
    sort: "&sort=created",
  });

  const sortedListings = listings.sort((a, b) => b._count.bids - a._count.bids);

  sortedListings
    .slice(0, 3)
    .forEach((listing) => createCard(listing, ".popular-listings"));

  const cards = Array.from(container.children);

  cards.forEach((card) => {
    card.classList.remove("col-12", "col-sm-6", "col-lg-4");
    card.classList.add("col-4");
  });
}
