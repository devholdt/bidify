import { createCard } from "../../components/index.js";
import { cachedFetch, APIv2_URLS } from "../index.js";

/**
 * Fetches and displays the top 3 listings that are closest to ending.
 */
export async function lastChance() {
	const allListings = await cachedFetch(
		`${APIv2_URLS.LISTINGS}?_seller=true&_bids=true&_active=true`
	);

	const lastChanceListings = allListings
		.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt))
		.slice(0, 3);

	lastChanceListings.forEach((listing) => createCard(listing, ".last-chance"));

	const container = document.querySelector(".last-chance");
	const cards = Array.from(container.children);

	cards.forEach((card) => {
		card.classList.remove("col-12", "col-sm-6", "col-lg-4");
		card.classList.add("col-4");
	});
}
