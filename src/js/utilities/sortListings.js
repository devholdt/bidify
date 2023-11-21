export function sortListings(listings, sortType) {
  switch (sortType) {
    case "created":
      return listings.sort((a, b) => new Date(b.created) - new Date(a.created));
    case "bids":
      return listings.sort((a, b) => b._count.bids - a._count.bids);
    case "endsAt":
      return listings.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
    default:
      throw new Error("Invalid sort type");
  }
}
