import { updateVisibleCount } from "../utilities/index.js";
import { getItem, setItem } from "../storage/index.js";

/**
 * This function handles the state of a checkbox, toggling the visibility of
 * listings and updating the checkbox's state in localStorage.
 *
 * @param {string} target - The id of the checkbox
 * @param {HTMLElement} container - The container of the listings
 */
export function checkboxState(target, container) {
	const checkbox = document.querySelector(`#toggleActive${target}`);

	if (checkbox) {
		const isChecked = getItem(`toggleActive${target}`);
		checkbox.checked = isChecked;

		toggleListingVisibility(container, isChecked, target);

		checkbox.addEventListener("change", () => {
			const isChecked = checkbox.checked;
			toggleListingVisibility(container, isChecked, target);
			setItem(`toggleActive${target}`, isChecked);
		});
	}
}

/**
 * Toggles the visibility of listings based on the state of a checkbox.
 *
 * @param {HTMLElement} container - The container of the listings.
 * @param {boolean} isChecked - The state of the checkbox.
 * @param {string} target - The id of the checkbox.
 */
function toggleListingVisibility(container, isChecked, target) {
	Array.from(container.children).forEach((item) => {
		if (item.classList.contains(`expired-${target.toLowerCase()}`)) {
			item.classList.toggle("d-none", !isChecked);
		}
	});

	updateVisibleCount(
		`.profile-${target.toLowerCase()}-active`,
		`.profile-${target.toLowerCase()}`
	);
}
