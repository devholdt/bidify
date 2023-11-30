export async function deleteListing(event) {
  const id = event.target.closest(".listing-card").dataset.id;
  console.log("Delete:", id);
}

export async function editListing(event) {
  const id = event.target.closest(".listing-card").dataset.id;
  console.log("Edit:", id);
}
