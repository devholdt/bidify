import * as components from "./components/index.js";
import * as profiles from "./api/profiles/index.js";
import * as storage from "./storage/index.js";
import * as events from "./events/index.js";

const name = storage.getItem("name");

if (!name) {
  window.location.href = components.URLS.INDEX;
}

const title = document.querySelector("title");
title.innerHTML = `Bidify | ${name}'s profile`;

components.authModals();
components.renderNav();
components.createListingForm();

profiles.profileListings();
profiles.profileBids();
profiles.profileWins();
profiles.renderProfileDetails();

events.elementVisibility("#buttonScrollUp", "d-flex", 600);
events.scrollToTop();
