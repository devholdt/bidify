import { getProfile, getProfileListings } from "./index.js";
import { getItem } from "../../storage/index.js";
import {
	createCard,
	createBidCard,
	createWinCard,
} from "../../components/index.js";
import { alert } from "../../utilities/index.js";
import { getSingleListing } from "../listings/index.js";

/**
 * Fetches and displays the listings associated with the current user's profile.
 *
 * @throws {Error} Throws an error if fetching profile listings fails.
 */
export async function profileListings() {
	try {
		if (getItem("name")) {
			const listings = await getProfileListings(getItem("name"));

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
			"An error occured when attempting to fetch profile listings. <strong>This does not mean your listings are inactive.</strong>",
			".profile-listings",
			null,
			false
		);
		throw new Error(
			`An error occured when attempting to fetch profile listings: ${error}`
		);
	}
}

/**
 * Fetches and displays the bids made by the current user.
 *
 * @throws {Error} Throws an error if fetching profile bids fails.
 */
export async function profileBids() {
	try {
		if (getItem("name")) {
			const bids = await getProfile(getItem("name"), true);
			const profileBidsContainer = document.querySelector(".profile-bids");

			if (bids.length > 0) {
				// profileBidsContainer.classList.add("row", "row-cols-3");
				bids.forEach((bid) => createBidCard(bid, ".profile-bids"));
			} else {
				profileBidsContainer.innerHTML = `<p class="d-flex justify-content-center">You have no active bids</p>`;
				document.querySelector(".toggle-active-bids").style.display = "none";
			}
		}
	} catch (error) {
		alert(
			"danger",
			"An error occured when attempting to get profile bids. <strong>This does not mean your bids are inactive.</strong>",
			".profile-bids",
			null,
			false
		);
		throw new Error(
			`An error occured when attempting to get profile bids: ${error}`
		);
	}
}

/**
 * Fetches and displays the listings won by the current user.
 *
 * @throws {Error} Throws an error if fetching or displaying won listings fails.
 */
export async function profileWins() {
	try {
		if (getItem("name")) {
			const userdata = await getProfile(getItem("name"));
			const winsId = userdata.wins;
			const profileWinsContainer = document.querySelector(".profile-wins");

			if (winsId.length > 0) {
				profileWinsContainer.classList.add("row", "row-cols-3");
				winsId.forEach(async (id) => {
					const win = await getSingleListing(id);
					createWinCard(win, ".profile-wins");
				});
			} else {
				profileWinsContainer.innerHTML = `<p class="d-flex justify-content-center">You haven't won anything yet. Keep bidding!</p>`;
			}
		}
	} catch (error) {
		alert(
			"danger",
			"An error occured when attempting to get and display won listings. <strong>This does not mean your wins are gone.</strong>",
			".profile-wins",
			null,
			false
		);
		throw new Error(
			`An error occured when attempting to get and display won listings: ${error}`
		);
	}
}
