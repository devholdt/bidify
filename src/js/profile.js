import * as components from "./components/index.js";
import * as profiles from "./api/profiles/index.js";
import * as storage from "./storage/index.js";

const userDataLocal = storage.getUser();

if (!userDataLocal) {
  window.location.href = components.URLS.INDEX;
}

const title = document.querySelector("title");
title.innerHTML = `Bidify | ${storage.getUser().name}'s profile`;

components.authModals();
components.renderNav();
components.createListingForm();

profiles.profileListings();
profiles.profileBids();
profiles.renderProfileDetails();
