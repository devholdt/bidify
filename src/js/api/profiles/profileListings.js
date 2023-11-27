import { getProfile } from "./fetch.js";
import { getItem } from "../../storage/index.js";
import { createCard, createBidCard } from "../../components/index.js";

export async function profileListings() {
  try {
    if (getItem("name")) {
      const userDataLocal = getItem("user");
      const userDataApi = await getProfile(userDataLocal.name);
      const listings = userDataApi.listings;

      const profileListingsContainer =
        document.querySelector(".profile-listings");

      if (listings.length > 0) {
        const profileListingsRow = document.createElement("div");
        profileListingsRow.classList.add("row", "row-cols-3", "mt-5");
        profileListingsContainer.append(profileListingsRow);

        listings
          .slice(0, 3)
          .forEach((listing) => createCard(listing, profileListingsRow));
      } else {
        profileListingsContainer.innerHTML = `<p class="d-flex justify-content-center">You have no active listings.</p>`;
      }
    }
  } catch (error) {
    console.error(
      `An error occured when trying to get profile listings: ${error}`
    );
  }
}

export async function profileBids() {
  try {
    if (getItem("name")) {
      const userDataLocal = getItem("user");
      const userDataApi = await getProfile(userDataLocal.name, true);
      const bids = userDataApi;

      const profileBidsContainer = document.querySelector(".profile-bids");

      if (bids.length > 0) {
        const profileBidsRow = document.createElement("div");
        profileBidsRow.classList.add("row", "row-cols-3", "mt-5");
        profileBidsContainer.append(profileBidsRow);

        bids.slice(0, 3).forEach((bid) => createBidCard(bid, profileBidsRow));
      } else {
        profileBidsContainer.innerHTML = `<p class="d-flex justify-content-center">You have no active bids</p>`;
      }
    }
  } catch (error) {
    console.error(`An error occured when trying to get profile bids: ${error}`);
  }
}