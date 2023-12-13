export function cardHtml(card, id, regular = true) {
  if (regular) {
    card.innerHTML = `
        <div class="listing-card shadow border h-100" data-id="${id}">
          <div class="card">
              <div class="card-top listing-card-top" data-bs-toggle="modal" data-bs-target="#listingModal"></div>
              <div class="card-body pt-5 pb-4 ps-0"></div>
              <div class="card-buttons d-flex justify-content-between align-items-end">
                  <button class="btn-heart">
                      <p class="material-icons">favorite_border</p>
                  </button>
              </div>
          </div>
        </div>`;
  } else {
    card.innerHTML = `<div class="listing-card shadow border" id="${id}">
        <div class="card">
          <div class="card-top listing-card-top" data-bs-toggle="modal" data-bs-target="#listingModal"></div>
          <div class="card-body d-flex flex-column justify-content-between border-0 w-100 m-0 p-0">
            <ul class="list-group list-group-flush w-100"></ul>
          </div>
        </div>
      </div>`;
  }
}
