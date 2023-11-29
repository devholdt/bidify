// export function formatDate(date) {
//   const month = date.toLocaleString("en-EN", { month: "long" });
//   const day = date.getDate().toString().padStart(2, "0");
//   const year = date.getFullYear().toString();
//   return `${month} ${day}, ${year}`;
// }

export function formatDate(date, time = false) {
  const day = date.getDate().toString().padStart(2, "0");

  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  const year = date.getFullYear().toString();

  const hours = date.getHours().toString().padStart(2, "0");

  const minutes = date.getMinutes().toString().padStart(2, "0");

  if (!time) {
    return `${day}/${month}/${year}`;
  }

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
