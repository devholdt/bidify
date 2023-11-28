import * as components from "./components/index.js";
import * as api from "./api/index.js";

api.popularListings();
api.latestListings();
api.lastChance();
api.displayListings();

components.renderNav();
components.authModals();
components.createListingForm();

// components.listingModalPreview();
