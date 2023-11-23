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
    avatar = userDataApi.avatar;
  }

  profileDetailsContainer.innerHTML = `
    <img src="${avatar}" alt="${user.name}'s avatar">
    <span class="material-icons">more_horiz</span>
    <div class="mt-3">
        <p class="fs-4 fw-medium mb-0">${user.name}</p>
        <p>${user.email}</p>
    </div>
    
    <p class="fs-5 fw-medium my-5">credit(s): ${user.credits}</p>
    
    <div>
        <p class="mb-0">listings: ${user._count.listings}</p>
        <p class="mb-0">bids: ${bids.length}</p>
        <p>wins: ${user.wins.length}</p>
    </div>`;
}
