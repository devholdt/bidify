import { getProfile, getProfileListings } from "./index.js";
import { getItem } from "../../storage/index.js";
import {
  createCard,
  createBidCard,
  createWinCard,
} from "../../components/index.js";
import { alert } from "../../utilities/index.js";
import { getListing } from "../listings/index.js";

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

export async function profileWins() {
  try {
    if (getItem("name")) {
      const userdata = await getProfile(getItem("name"));
      const winsId = userdata.wins;
      const profileWinsContainer = document.querySelector(".profile-wins");

      if (winsId.length > 0) {
        profileWinsContainer.classList.add("row", "row-cols-3");

        winsId.forEach(async (id) => {
          const win = await getListing(id);
          createWinCard(win, ".profile-wins");
        });
      } else {
        profileWinsContainer.innerHTML = `<p class="d-flex justify-content-center">You haven't won anything yet. Keep bidding!</p>`;
      }
    }
  } catch (error) {
    alert(
      "danger",
      "An error occured when trying to get wins. <strong>This does not mean your wins are gone.</strong>",
      ".profile-wins",
      null,
      false
    );
  }
}
