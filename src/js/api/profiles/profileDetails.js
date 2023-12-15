import { getProfile } from "./index.js";
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
  const user = await getProfile(name);
  const bids = await getProfile(name, true);

  let avatar;

  if (!user.avatar) {
    avatar = DEFAULT_URLS.AVATAR;
  } else {
    avatar = user.avatar;
  }

  profileDetailsContainer.innerHTML = `
  <div class="profile-details_container text-center shadow">

    <div class="profile-details_icon text-end">
      <p class="material-icons" data-bs-toggle="modal" data-bs-target="#editProfileModal" title="Edit profile" aria-label="Edit profile">more_horiz</p>
    </div>

    <div class="row align-items-center m-auto">

      <div class="profile-details_user mb-5 col-6 col-lg-12">

        <button class="profile-details_avatar border-1 shadow-sm mb-3" 
          style="background: url(${avatar}); background-size: cover;"
          data-bs-toggle="modal" data-bs-target="#editProfileModal">
            <span class="fw-bold text-light">change avatar</span>
        </button>

        <div>
          <p class="fs-4 fw-medium mb-0">${user.name}</p>
          <p>${user.email}</p>
        </div>
      </div>
      
      <div class="profile-details_info col-6 col-lg-12">

        <p class="fs-5 fw-medium pb-5">$${user.credits}</p>
        
        <div>
          <p class="mb-0">listings: ${user._count.listings}</p>
          <p class="mb-0">bids: ${bids.length}</p>
          <p>wins: ${user.wins.length}</p>
        </div>
      </div>

    </div>

  </div>`;

  profileListingsCount.innerHTML = user._count.listings;
  profileBidsCount.innerHTML = bids.length;
}
