export function formatDate(date) {
  const month = date.toLocaleString("en-EN", { month: "long" });
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${month} ${day}, ${year}`;
}
