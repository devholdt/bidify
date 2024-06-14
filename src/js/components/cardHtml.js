export function cardHtml(card, id, regular = true) {
	if (regular) {
		card.innerHTML = `
    <div class="listing-card shadow border h-100" data-id="${id}">
      <div class="card">
          <div class="card-top listing-card-top" data-bs-toggle="modal" data-bs-target="#listingModal"></div>
          <div class="card-body pt-5 pb-4 ps-0"></div>
          <div class="card-buttons d-flex justify-content-between align-items-end">
            <button class="btn-gavel" data-bs-toggle="modal" data-bs-target="#listingModal">
              <p class="material-icons">gavel</p>
            </button>
          </div>
      </div>
    </div>`;
	} else {
		card.innerHTML = `
		<div class="listing-card-small shadow border" id="${id}">
		  <div class="card">
		    <div class="card-body d-flex align-items-center p-0 m-0">
		      <div class="card-media listing-card-top"></div>
		      <ul class="list-group list-group-flush w-100"></ul>
		  </div>
		</div>`;
	}
}
