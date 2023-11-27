import * as components from "./components/index.js";
import * as api from "./api/index.js";

api.popularListings();
api.latestListings();
api.lastChance();
api.displayListings();
api.createListing();

components.modals();
components.renderNav();
