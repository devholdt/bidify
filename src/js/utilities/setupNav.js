import { URLS, DEFAULT_URLS } from "../components/index.js";
import { getItem } from "../storage/index.js";

export function setupNav(navButtons, navLinks, navLinksCollapse, links) {
  const isLoggedIn = getItem("name");
  updateNavButtons(isLoggedIn, navButtons);
  updateNavLinks(navLinks, links);

  if (window.innerWidth < 992) {
    updateNavLinks(navLinksCollapse, links);
  } else {
    navLinksCollapse.innerHTML = "";
  }
}

function userInfo(container, userData) {
  container.innerHTML = `
    <div class="d-flex">
      <a href="${URLS.PROFILE}?name=${userData.name}" class="d-flex gap-2 text-decoration-none text-dark pe-2">
        <img src="${userData.avatar}" class="avatar" alt="${userData.name}'s avatar" onerror='this.src="${DEFAULT_URLS.AVATAR}"'>
        <div class="d-flex flex-column">
          <p class="mb-0 fw-light">${userData.name}</p>
          <p class="text-primary fw-normal">$${userData.credits}</p>
        </div>
      </a>
      <button class="btn btn-outline-dark h-100 my-auto ms-2 rounded-0 shadow-sm" 
      data-bs-toggle="modal" data-bs-target="#logoutModal">
        <span>logout</span>
      </button>
    </div>`;
}

export function updateUserInfo(headerContainer, collapseContainer, userData) {
  userInfo(headerContainer, userData);

  if (screen.width < 992) {
    userInfo(collapseContainer, userData);
  } else {
    collapseContainer.innerHTML = "";
  }
}

export function updateNavLinks(container, links) {
  const { pathname } = document.location;

  container.innerHTML = links
    .map(
      (link) => `
      <li class="nav-item nav-regular">
          <a href="${link.href}" class="nav-link text-white ${
        pathname === `/${link.href}` ? "active" : ""
      }">
              <span>${link.text}</span>
          </a>
      </li>`
    )
    .join("");
}

function updateNavButtons(isLoggedIn, container1, container2) {
  if (isLoggedIn) {
    container1.innerHTML = `
        <div class="nav-divider"></div>
        <li class="nav-item nav-regular">
            <button class="nav-link text-white btn-login" 
            data-bs-toggle="modal" data-bs-target="#logoutModal">
              <span>Logout</span>
            </button>
        </li>`;

    if (container2) {
      container2.innerHTML = `
            <button type="button" class="btn btn-yellow btn-cta">Listings</button>`;
    }
  } else {
    container1.innerHTML = `
      <div class="nav-divider"></div>
      <li class="nav-item nav-regular">
          <button class="nav-link text-white btn-login" data-bs-toggle="modal"
          data-bs-target="#loginModal"><span>Login</span></button>
      </li>`;

    if (container2) {
      container2.innerHTML = `
        <button type="button" class="btn btn-primary btn-cta" 
        data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>`;
    }
  }
}
