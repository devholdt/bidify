import {
  updateCountdown,
  scrollingTitle,
  getListingValues,
  formatDate,
  detailsListItem,
  updateVisibleCount,
} from "../utilities/index.js";
import { DEFAULT_URLS, listingModalPreview } from "./index.js";
import { getItem } from "../storage/index.js";
import { deleteListingEvent, editListingEvent } from "../events/index.js";
import { getListing } from "../api/index.js";

export function createCard(listing, containerSelector) {
  const listingsContainer = document.querySelector(containerSelector);

  let listingMedia;
  let listingBids = "";
  const listingEndsAt = new Date(listing.endsAt);

  if (listing.media.length === 0) {
    listingMedia = `<img src="./src/images/bidify_nomedia.svg" class="card-img-top no-media-found" alt="Listing image">`;
  } else {
    listingMedia = `<img src="${listing.media[0]}" class="card-img-top" alt="Listing image" onerror='this.src="${DEFAULT_URLS.LISTING_MEDIA}";this.classList.add("no-media-found")'>`;
  }

  const img = new Image();

  if (listing.media.length === 0) {
    img.src = "./src/images/bidify_nomedia.svg";
    img.alt = listing.title;
    img.classList.add("card-img-top", "no-media-found");
  } else {
    img.src = listing.media[0];
    img.alt = listing.title;
    img.classList.add("card-img-top");

    img.onerror = () => {
      img.src = DEFAULT_URLS.LISTING_MEDIA;
      img.alt = listing.title;
      img.classList.add("no-media-found");
    };
  }

  if (listing.bids && listing.bids.length > 0) {
    let bidsArray = [...listing.bids];
    bidsArray.reverse();
    listingBids = `<p class="card-text">Current bid: <span class="fw-medium text-primary">$${bidsArray[0].amount}</span> (${listing._count.bids})</p>`;
  } else {
    listingBids = `<p class="card-text">No bids yet</p>`;
  }

  const card = document.createElement("div");
  card.classList.add("col-12", "col-sm-6", "col-lg-4", "mb-4");

  card.innerHTML = `
        <div class="listing-card shadow border" data-id="${listing.id}">
          <div class="card">

              <div class="card-top listing-card-top" data-bs-toggle="modal" data-bs-target="#listingModal"></div>

              <div class="card-body pt-5 pb-4 ps-0">
                ${listingBids}
              </div>

              <div class="card-buttons d-flex justify-content-between align-items-end">
                  <button class="btn-heart">
                      <p class="material-icons">favorite_border</p>
                  </button>
              </div>

          </div>
        </div>`;

  card.querySelector(".listing-card-top").append(img);

  const countdownContainer = document.createElement("div");
  countdownContainer.classList.add("countdown");

  const daysElement = document.createElement("span");
  const hoursElement = document.createElement("span");
  const minsElement = document.createElement("span");
  const secsElement = document.createElement("span");

  [daysElement, hoursElement, minsElement, secsElement].forEach((element) => {
    element.classList.add("countdown-part");
    countdownContainer.appendChild(element);
  });

  card.querySelector(".card-top").appendChild(countdownContainer);

  updateCountdown(
    listingEndsAt,
    daysElement,
    hoursElement,
    minsElement,
    secsElement
  );
  countdownContainer.countdownInterval = setInterval(() => {
    updateCountdown(
      listingEndsAt,
      daysElement,
      hoursElement,
      minsElement,
      secsElement
    );
  }, 1000);

  listingsContainer.appendChild(card);

  if (daysElement.innerHTML === "Expired") {
    card.classList.add("d-none");

    card.querySelector(".card-img-top").style.opacity = "50%";
    card.querySelector(".card-body").style.opacity = "50%";
    card.querySelector(".countdown-part").style.backgroundColor = "#FF5252";
  }

  const checkbox = document.querySelector("#toggleActiveListings");

  if (checkbox) {
    const checked = getItem("toggleActiveListings");

    if (checked) {
      checkbox.checked = true;
      Array.from(listingsContainer.children).forEach((card) =>
        card.classList.remove("d-none")
      );
    }

    updateVisibleCount(".profile-listings-active", ".profile-listings");

    checkbox.addEventListener("change", (event) => {
      Array.from(listingsContainer.children).forEach((card) => {
        if (card.querySelector(".countdown-part").innerHTML === "Expired") {
          card.classList.toggle("d-none", !event.currentTarget.checked);
        }
      });

      updateVisibleCount(".profile-listings-active", ".profile-listings");

      if (event.currentTarget.checked) {
        localStorage.setItem("toggleActiveListings", "true");
      } else {
        localStorage.removeItem("toggleActiveListings");
      }
    });
  }

  const titleElement = document.createElement("h5");
  titleElement.classList.add("card-title", "fw-bold");
  titleElement.textContent = listing.title;

  const titleWrapper = document.createElement("div");
  titleWrapper.classList.add("title-wrapper");
  titleWrapper.appendChild(titleElement);

  card.querySelector(".card-body").prepend(titleWrapper);

  scrollingTitle();

  const cardTop = card.querySelector(".card-top");
  listingModalPreview(listing, cardTop);

  if (getItem("name")) {
    if (listing.seller && listing.seller.name !== getItem("name")) {
      const cardButton = document.createElement("button");
      cardButton.classList.add("btn-gavel");
      cardButton.setAttribute("data-bs-toggle", "modal");
      cardButton.setAttribute("data-bs-target", "#listingModal");
      cardButton.innerHTML = `<p class="material-icons">gavel</p>`;

      card.querySelector(".card-buttons").prepend(cardButton);

      const gavelButton = card.querySelector(".btn-gavel");
      listingModalPreview(listing, gavelButton);
    } else if (!listing.seller || listing.seller.name == getItem("name")) {
      const cardButtons = card.querySelector(".card-buttons");
      cardButtons.classList.remove("justify-content-between");
      cardButtons.classList.add("justify-content-end");
      cardButtons.innerHTML = `
      <button class="btn btn-light rounded-0 rounded-start btn-edit" data-bs-toggle="modal" data-bs-target="#editListingModal" data-id="${listing.id}">
        <span class="material-icons">edit</span>
      </button>
      <button class="btn btn-light rounded-0 rounded-end btn-delete" data-id="${listing.id}">
        <span class="material-icons">delete</span>
      </button>`;

      cardButtons
        .querySelector(".btn-delete")
        .addEventListener("click", deleteListingEvent);

      cardButtons
        .querySelector(".btn-edit")
        .addEventListener("click", getListingValues);

      document
        .querySelector("#editListingForm")
        .addEventListener("submit", editListingEvent);
    }
  }
}

export async function createBidCard(bid, containerSelector) {
  const bidsContainer = document.querySelector(containerSelector);
  const listing = await getListing(bid.listing.id);
  const sortedListing = listing.bids.sort((a, b) => b.amount - a.amount);
  const card = document.createElement("div");
  card.classList.add("col-12", "col-sm-6", "col-lg-4", "mb-4", "listing-bid");

  let listingMedia = "";

  if (bid.listing.media.length === 0) {
    listingMedia = `<img src="./src/images/bidify_nomedia.svg" class="card-img-top no-media-found" alt="Listing image">`;
  } else {
    listingMedia = `<img src="${bid.listing.media[0]}" class="card-img-top" alt="Listing image" onerror='this.src="${DEFAULT_URLS.LISTING_MEDIA}";this.classList.add("no-media-found")'>`;
  }

  const listingEndsAt = new Date(bid.listing.endsAt);

  card.innerHTML = `
  <div class="listing-card shadow border" id="${bid.listing.id}">
    <div class="card">

      <div class="card-top listing-card-top" data-bs-toggle="modal" data-bs-target="#listingModal">
        ${listingMedia}
      </div>

      <div class="card-body d-flex flex-column justify-content-between border-0 w-100 m-0 p-0">
        <ul class="list-group list-group-flush w-100"></ul>
      
      </div>

    </div>
  </div>`;

  const cardTop = card.querySelector(".card-top");
  listingModalPreview(listing, cardTop);

  const countdownContainer = document.createElement("div");
  countdownContainer.classList.add("countdown");

  const daysElement = document.createElement("span");
  const hoursElement = document.createElement("span");
  const minsElement = document.createElement("span");
  const secsElement = document.createElement("span");

  [daysElement, hoursElement, minsElement, secsElement].forEach((element) => {
    element.classList.add("countdown-part");
    countdownContainer.appendChild(element);
  });

  card.querySelector(".card-top").appendChild(countdownContainer);

  updateCountdown(
    listingEndsAt,
    daysElement,
    hoursElement,
    minsElement,
    secsElement
  );
  countdownContainer.countdownInterval = setInterval(() => {
    updateCountdown(
      listingEndsAt,
      daysElement,
      hoursElement,
      minsElement,
      secsElement
    );
  }, 1000);

  const listGroup = card.querySelector(".list-group");

  listGroup.innerHTML += detailsListItem(
    "Your bid",
    `<span class="fw-medium text-primary">$${bid.amount}</span>`
  );
  listGroup.innerHTML += detailsListItem(
    "Current bid",
    `<span class="fw-medium text-primary">$${sortedListing[0].amount}</span>`
  );
  listGroup.innerHTML += detailsListItem(
    "Date",
    formatDate(new Date(bid.created))
  );
  listGroup.innerHTML += detailsListItem("Bid ID", bid.id.slice(0, 8));

  bidsContainer.appendChild(card);

  if (daysElement.innerHTML === "Expired") {
    card.classList.add("d-none");

    card.querySelector(".card-img-top").style.opacity = "50%";
    card.querySelector(".card-body").style.opacity = "50%";
    card.querySelector(".countdown-part").style.backgroundColor = "#FF5252";
  }

  const checkbox = document.querySelector("#toggleActiveBids");

  if (checkbox) {
    const checked = getItem("toggleActiveBids");

    if (checked) {
      checkbox.checked = true;
      Array.from(bidsContainer.children).forEach((card) =>
        card.classList.remove("d-none")
      );
    }

    updateVisibleCount(".profile-bids-active", ".profile-bids");

    checkbox.addEventListener("change", (event) => {
      Array.from(bidsContainer.children).forEach((card) => {
        if (card.querySelector(".countdown-part").innerHTML === "Expired") {
          card.classList.toggle("d-none", !event.currentTarget.checked);
        }
      });

      updateVisibleCount(".profile-bids-active", ".profile-bids");

      if (event.currentTarget.checked) {
        localStorage.setItem("toggleActiveBids", "true");
      } else {
        localStorage.removeItem("toggleActiveBids");
      }
    });
  }
}

export async function createWinCard(win, containerSelector) {
  const winsContainer = document.querySelector(containerSelector);
  const listing = await getListing(win.id);
  const card = document.createElement("div");
  card.classList.add("col-12", "col-sm-6", "col-lg-4", "mb-4", "listing-win");

  let listingMedia = "";

  if (win.media.length === 0) {
    listingMedia = `<img src="./src/images/bidify_nomedia.svg" class="card-img-top no-media-found" alt="Listing image">`;
  } else {
    listingMedia = `<img src="${win.media[0]}" class="card-img-top" alt="Listing image" onerror='this.src="${DEFAULT_URLS.LISTING_MEDIA}";this.classList.add("no-media-found")'>`;
  }

  card.innerHTML = `
  <div class="listing-card shadow border" id="${win.id}">
    <div class="card">

      <div class="card-top listing-card-top" data-bs-toggle="modal" data-bs-target="#listingModal">
        ${listingMedia}
      </div>

      <div class="card-body d-flex flex-column justify-content-between border-0 w-100 m-0 p-0">
        <ul class="list-group list-group-flush w-100"></ul>
      
      </div>

    </div>
  </div>`;

  const cardTop = card.querySelector(".card-top");
  listingModalPreview(listing, cardTop);

  const listGroup = card.querySelector(".list-group");

  listGroup.innerHTML += detailsListItem("Title", win.title);
  listGroup.innerHTML += detailsListItem(
    "Created",
    formatDate(new Date(win.created))
  );
  listGroup.innerHTML += detailsListItem(
    "Ended at",
    formatDate(new Date(win.endsAt), true)
  );
  listGroup.innerHTML += detailsListItem("ID", win.id.slice(0, 8));

  winsContainer.appendChild(card);
}
