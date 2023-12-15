/**
 * Creates a debounced version of a function.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} [timeout=100] - The amount of time in milliseconds to delay.
 * @returns {Function} A debounced version of the passed function.
 */
export function debounce(func, timeout = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
