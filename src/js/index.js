import * as components from "./components/index.js";
import * as api from "./api/index.js";
import * as events from "./events/index.js";

// const container = document.querySelector(".search-results");
// container.innerHTML = "";
// for (let i = 0; i < 12; i++) {
//   container.innerHTML += components.placeholderCard;
// }

api.popularListings();
api.latestListings();
api.lastChance();
api.displayListings();

components.renderNav();
components.authModals();
components.createListingForm();
components.handleWindowLoad();

events.elementVisibility("#buttonScrollUp", "d-flex", 600);
events.scrollToTop();
