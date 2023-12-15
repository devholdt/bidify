/**
 * Formats a Date object into a string representation.
 *
 * @param {Date} date - The date to format.
 * @param {boolean} [time=false] - Whether to include the time in the format.
 * @returns {string} A string representing the formatted date.
 */
export function formatDate(date, time = false) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${day}/${month}/${year.slice(-2)}`;

  if (time) {
    return `${formattedDate} ${hours}:${minutes}`;
  }

  return formattedDate;
}
