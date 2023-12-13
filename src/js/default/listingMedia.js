import { DEFAULT_URLS } from "../components/index.js";

export function listingMedia(listing, card) {
  const img = new Image();
  if (listing.media.length === 0) {
    img.src = "./src/images/bidify_nomedia.svg";
    img.alt = listing.title;
    img.classList.add("card-img-top", "no-media-found");
  } else {
    img.src = listing.media[0];
    img.alt = listing.title;
    img.classList.add("card-img-top");

    img.onerror = () => {
      img.src = DEFAULT_URLS.LISTING_MEDIA;
      img.alt = listing.title;
      img.classList.add("no-media-found");
    };
  }

  card.querySelector(".listing-card-top").append(img);
}
