import * as components from "./components/index.js";
import * as profiles from "./api/profiles/index.js";
import * as storage from "./storage/index.js";

const userDataLocal = storage.getUser();

if (!userDataLocal) {
  window.location.href = components.URLS.INDEX;
}

components.modals();
components.renderNav();

profiles.profileListings();
profiles.profileBids();
profiles.renderProfileDetails();
