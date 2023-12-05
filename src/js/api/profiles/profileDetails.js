import { getProfile } from "./index.js";
import { getUser } from "../../storage/index.js";
import { DEFAULT_URLS } from "../../components/index.js";

export async function renderProfileDetails() {
  const profileDetailsContainer = document.querySelector(".profile-details");
  const userLocal = getUser();
  const user = await getProfile(userLocal.name);
  const bids = await getProfile(userLocal.name, true);

  let avatar;

  if (!user.avatar) {
    avatar = DEFAULT_URLS.AVATAR;
  } else {
    avatar = user.avatar;
  }

  profileDetailsContainer.innerHTML = `
    <div class="profile-details_container text-center">

      <div class="profile-details_icon text-end">
        <p class="material-icons" data-bs-toggle="modal" data-bs-target="#editProfileModal" title="Edit profile" aria-label="Edit profile">more_horiz</p>
      </div>

      <div class="row align-items-center m-auto">

        <div class="profile-details_user mb-5 col-6 col-lg-12">

          <div class="profile-details_img mb-3">
            <img src="${avatar}" class="avatar" alt="${user.name}'s avatar">
          </div>

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
}
