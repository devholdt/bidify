export function formatDate(date, time = false) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  if (time) {
    return `${day}/${month}/${year.slice(-2, 4)} ${hours}:${minutes}`;
  }

  return `${day}/${month}/${year.slice(-2, 4)}`;
}
