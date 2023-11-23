import { renderNav, modals } from "./components/index.js";
import { profileListings, profileBids } from "./api/profiles/index.js";

modals();
renderNav();

profileListings();
profileBids();
