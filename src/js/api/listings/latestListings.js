import { createCard } from "../../components/index.js";
import { cachedFetch, API_URLS } from "../index.js";

/**
 * Fetches and displays the top 3 latest listings.
 */
export async function latestListings() {
	const listings = await cachedFetch(
		`${API_URLS.LISTINGS}?_seller=true&_bids=true&_active=true&sortOrder=desc&sort=created`
	);

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
