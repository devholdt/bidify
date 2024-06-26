import { getProfileData } from "./index.js";
import { getItem } from "../../storage/index.js";
import { DEFAULT_URLS } from "../../components/index.js";

/**
 * Renders the profile details of the current user in the DOM.
 *
 * @returns {Promise<void>} A promise that resolves once the profile details are rendered.
 */
export async function renderProfileDetails() {
	const profileDetailsContainer = document.querySelector(".profile-details");
	const profileListingsCount = document.querySelector(
		".profile-listings-count"
	);
	const profileBidsCount = document.querySelector(".profile-bids-count");
	const name = getItem("name");
	const user = await getProfileData(name, "user");
	const bids = await getProfileData(name, "bids");

	let avatarUrl;
	let avatarAlt;

	if (!user.avatar.url || user.avatar.url === "") {
		avatarUrl = DEFAULT_URLS.AVATAR;
		avatarAlt = "Profile avatar";
	} else {
		avatarUrl = user.avatar.url;
		avatarAlt = user.avatar.alt;
	}

	profileDetailsContainer.innerHTML = `
  <div class="profile-details_container text-center shadow">

    <div class="profile-details_icon text-end">
      <p class="material-icons" data-bs-toggle="modal" data-bs-target="#editProfileModal" title="Edit profile" aria-label="Edit profile">more_horiz</p>
    </div>

    <div class="row align-items-center m-auto">

      <div class="profile-details_user mb-5 col-6 col-lg-12">

        <button class="profile-details_avatar border border-light shadow-sm mb-3" data-bs-toggle="modal" data-bs-target="#editProfileModal">
            <img src="${avatarUrl}" alt="${avatarAlt}" class="profile-details_avatar-img avatar">
            <span class="fw-semibold text-light overlay-text">change avatar</span>
        </button>

        <div>
          <p class="fs-4 fw-normal mb-0">${user.name}</p>
          <p>${user.email}</p>
        </div>

      </div>
      
      <div class="profile-details_info col-6 col-lg-12">

        <p class="fs-5 fw-normal text-primary pb-5">$${user.credits}</p>
        
        <div>
          <p class="mb-0">listings: ${user._count.listings}</p>
          <p class="mb-0">total bids: ${bids.length}</p>
          <p>wins: ${user.wins.length}</p>
        </div>
        
      </div>

    </div>

  </div>`;

	profileListingsCount.innerHTML = user._count.listings;
	profileBidsCount.innerHTML = bids.length;
}
