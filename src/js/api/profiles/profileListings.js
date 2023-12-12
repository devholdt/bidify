import { getProfile, getProfileListings } from "./fetch.js";
import { getItem } from "../../storage/index.js";
import { createCard, createBidCard } from "../../components/index.js";
import { alert } from "../../utilities/index.js";

export async function profileListings() {
  try {
    if (getItem("name")) {
      const userDataLocal = getItem("user");
      const listings = await getProfileListings(userDataLocal.name);
      const profileListingsContainer =
        document.querySelector(".profile-listings");

      if (listings.length > 0) {
        profileListingsContainer.classList.add("row");
        listings.forEach((listing) => createCard(listing, ".profile-listings"));
      } else {
        profileListingsContainer.innerHTML = `<p class="d-flex justify-content-center">You have no active listings.</p>`;
        document.querySelector(".toggle-active-listings").style.display =
          "none";
      }
    }
  } catch (error) {
    alert(
      "danger",
      "An error occured when attempting to fetch profile listings",
      ".profile-listings",
      null,
      false
    );

    console.error(error);
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
        profileBidsContainer.classList.add("row", "row-cols-3");
        bids.forEach((bid) => createBidCard(bid, ".profile-bids"));
      } else {
        profileBidsContainer.innerHTML = `<p class="d-flex justify-content-center">You have no active bids</p>`;
        document.querySelector(".toggle-active-bids").style.display = "none";
      }
    }
  } catch (error) {
    alert(
      "danger",
      "An error occured when trying to get profile bids",
      ".profile-bids",
      null,
      false
    );
  }
}
