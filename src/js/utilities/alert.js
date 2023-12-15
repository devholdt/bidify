/**
 * Displays an alert message of a specified type in a target element.
 *
 * @param {string} type - The type of alert (e.g., 'success', 'danger').
 * @param {string} content - The HTML content to display in the alert.
 * @param {string} target - The CSS selector of the target element where the alert will be displayed.
 * @param {number|null} [duration=2000] - The duration in milliseconds before the alert disappears. If null, the alert remains visible.
 * @param {boolean} [dismissible=true] - Whether the alert should have a dismiss button.
 */
export function alert(
  type,
  content,
  target,
  duration = 2000,
  dismissible = true
) {
  const element = document.querySelector(target);

  element.innerHTML = "";

  const wrapper = document.createElement("div");

  let dismiss;
  let dismissBtn;

  if (dismissible) {
    dismiss = "alert-dismissible";
    dismissBtn = `<button type="button" class="btn-close m-auto p-3" data-bs-dismiss="alert" aria-label="Close"></button>`;
  } else {
    dismiss = "";
    dismissBtn = "";
  }

  wrapper.innerHTML = `
  <div class="alert alert-${type} ${dismiss} mb-0" role="alert">
    <div class="w-75">${content}</div>
    ${dismissBtn}
  </div>`;

  element.append(wrapper);

  if (duration !== null) {
    setTimeout(() => {
      wrapper.innerHTML = "";
    }, duration);
  }
}
