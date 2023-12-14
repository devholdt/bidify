import { createCard } from "../../components/index.js";
import { cachedFetch, API_URLS } from "../index.js";

export async function popularListings() {
  const container = document.querySelector(".popular-listings");

  const listings = await cachedFetch(
    `${API_URLS.LISTINGS}?_seller=true&_bids=true&_active=true&sortOrder=desc&sort=created`
  );

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
