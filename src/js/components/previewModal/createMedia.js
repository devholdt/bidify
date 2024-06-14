import { DEFAULT_URLS } from "../index.js";

/**
 * Populates the listing media section with images or a carousel, based on the listing's media.
 *
 * @param {object} listing - The listing object containing media information.
 */
export function createMedia(listing) {
	const media = document.querySelector("#listingModalMedia");

	if (media) {
		media.innerHTML = "";

		if (listing.media.length < 1) {
			media.classList.remove("media-carousel");
			media.innerHTML = `
          <img src="${DEFAULT_URLS.LISTING_MEDIA}" class="w-100 h-100 border object-fit-cover" alt="Listing media" onerror="this.src='${DEFAULT_URLS.LISTING_MEDIA}'">`;
		} else if (listing.media.length > 1) {
			media.classList.add("media-carousel");

			media.innerHTML = `
          <div id="listingModalCarousel" class="carousel slide carousel-fade">
            <div id="listingModalCarouselInner" class="carousel-inner"></div>
            <div class="carousel-indicators"></div>
          </div>`;

			const carouselIndicators = document.querySelector(".carousel-indicators");
			const carouselInner = document.querySelector(
				"#listingModalCarouselInner"
			);

			listing.media.forEach((media, index) => {
				const carouselItem = document.createElement("div");
				carouselItem.classList.add("carousel-item");
				if (index === 0) carouselItem.classList.add("active");

				carouselItem.innerHTML = `<img src="${media.url}" class="d-block w-100 h-100 object-fit-cover" alt="Listing media" onerror="this.src='${DEFAULT_URLS.LISTING_MEDIA}'">`;
				carouselInner.appendChild(carouselItem);

				const indicator = document.createElement("button");
				indicator.classList.add("carousel-thumbnail");
				if (index === 0) {
					indicator.classList.add("active");
				}
				indicator.setAttribute("data-bs-target", "#listingModalCarousel");
				indicator.setAttribute("data-bs-slide-to", index);
				indicator.style.background = `no-repeat center url(${media.url})`;
				indicator.style.backgroundSize = "cover";
				carouselIndicators.appendChild(indicator);
			});
		} else {
			media.classList.remove("media-carousel");
			media.innerHTML = `
        <img src="${listing.media[0].url}" class="w-100 h-100 border object-fit-cover" alt="Listing media" onerror="this.src='${DEFAULT_URLS.LISTING_MEDIA}'">`;
		}
	}
}
