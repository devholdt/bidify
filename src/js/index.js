import * as components from "./components/index.js";
import * as api from "./api/index.js";
import * as events from "./events/index.js";

api.displayListingsByType("popular");
api.displayListingsByType("latest");
api.displayListingsByType("last-chance");
api.displayListings();

components.renderNav();
components.handleWindowLoad();
components.authModals();
components.createListingForm();

events.elementVisibility("#buttonScrollUp", "d-flex", 600);
events.scrollToTop();
events.searchEvent();
