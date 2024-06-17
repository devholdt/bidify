import { getProfile, getProfileListings } from "./index.js";
import { getItem } from "../../storage/index.js";
import {
	createListingRow,
	createBidRow,
	createWinRow,
} from "../../components/index.js";
import { alert } from "../../utilities/index.js";
import { getSingleListing } from "../listings/index.js";
import { checkboxState } from "../../components/checkboxState.js";

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
			const listingsTable = document.querySelector(".listings-table");

			if (listings.length > 0) {
				listings.forEach((listing) =>
					createListingRow(listing, ".profile-listings")
				);
				checkboxState("Listings", profileListingsContainer);
			} else {
				listingsTable.innerHTML = `<p class="d-flex justify-content-center">You have no active listings</p>`;
				document.querySelector(".toggle-active-listings").style.display =
					"none";
			}
		}
	} catch (error) {
		alert(
			"danger",
			"An error occurred when attempting to fetch profile listings. <strong>This does not mean your listings are inactive.</strong>",
			".profile-listings",
			null,
			false
		);
		throw new Error(
			`An error occurred when attempting to fetch profile listings: ${error}`
		);
	}
}

/**
 * Fetches and displays the bids made by the current user.
 *
 * @return {Promise<void>} Resolves when the bids are fetched and displayed.
 * @throws {Error} Throws an error if fetching profile bids fails.
 */
export async function profileBids() {
	try {
		if (getItem("name")) {
			const bids = await getProfile(getItem("name"), true);

			const profileBidsContainer = document.querySelector(".profile-bids");
			const bidsTable = document.querySelector(".bids-table");

			if (bids.length > 0) {
				const highestBidsMap = {};

				for (const bid of bids) {
					const listing = await getSingleListing(bid.listing.id);

					if (bid && listing) {
						createBidRow(bid, listing, ".profile-bids", highestBidsMap);
					} else {
						console.error("Invalid bid or listing data:", bid);
					}
				}

				checkboxState("Bids", profileBidsContainer);
			} else {
				bidsTable.innerHTML = `<p class="d-flex justify-content-center">You have no active bids</p>`;
				document.querySelector(".toggle-active-bids").style.display = "none";
			}
		}
	} catch (error) {
		alert(
			"danger",
			"An error occurred when attempting to get profile bids. <strong>This does not mean your bids are inactive.</strong>",
			".profile-bids",
			null,
			false
		);
		throw new Error(
			`An error occurred when attempting to get profile bids: ${error}`
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
			const wins = userdata.wins;

			const profileWinsContainer = document.querySelector(".profile-wins");
			const winsTable = document.querySelector(".wins-table");

			if (wins.length > 0) {
				profileWinsContainer.classList.add("row", "row-cols-3");
				wins.forEach(async (id) => {
					const win = await getSingleListing(id);
					createWinRow(win, ".profile-wins");
				});
			} else {
				winsTable.innerHTML = `<p class="d-flex justify-content-center">You haven't won anything yet. Keep bidding!</p>`;
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

localStorage.clear();
