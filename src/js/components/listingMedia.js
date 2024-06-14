import { DEFAULT_URLS } from "./index.js";

/**
 * Appends the first media image to a listing card.
 *
 * @param {object} listing - The listing object containing media information.
 * @param {HTMLElement} card - The card element to which the media image will be appended.
 * @param {string} target - The CSS selector within the card where the image will be placed.
 */
export function listingMedia(listing, card, target) {
	const img = new Image();

	if (listing.media.length === 0) {
		img.src = "./src/images/bidify_nomedia.svg";
		img.alt = listing.title;
		img.classList.add("card-img-top", "no-media-found");
	} else {
		img.src = listing.media[0].url;
		img.alt = listing.media[0].alt;
		img.classList.add("card-img-top");

		img.onerror = () => {
			img.src = DEFAULT_URLS.LISTING_MEDIA;
			img.alt = listing.title;
			img.classList.add("no-media-found");
		};
	}

	card.querySelector(target).append(img);
}
