import { updateVisibleCount } from "../utilities/index.js";

/**
 * Updates the visibility of elements based on a checkbox state and stored data.
 *
 * @param {string} target - The target element to update.
 * @param {HTMLElement} container - The container element containing the elements to update.
 */
export function checkboxState(target, container) {
	const checkbox = document.querySelector(`#toggleActive${target}`);

	if (checkbox) {
		const checked = localStorage.getItem(`toggleActive${target}`);

		if (checked) {
			checkbox.checked = true;
			Array.from(container.children).forEach((element) =>
				element.classList.remove("d-none")
			);
		}

		updateVisibleCount(
			`.profile-${target.toLowerCase()}-active`,
			`.profile-${target.toLowerCase()}`
		);

		checkbox.addEventListener("change", (event) => {
			Array.from(container.children).forEach((element) => {
				const statusCell = element.querySelector(".status-cell span");

				if (statusCell) {
					if (
						element.querySelector(".countdown-part").innerHTML === "Expired" ||
						element.querySelector(".status-cell span").innerHTML ===
							"Self-Outbid"
					) {
						element.classList.toggle("d-none", !event.currentTarget.checked);
					}
				} else if (
					element.querySelector(".countdown-part").innerHTML === "Expired"
				) {
					element.classList.toggle("d-none", !event.currentTarget.checked);
				}
			});

			updateVisibleCount(
				`.profile-${target.toLowerCase()}-active`,
				`.profile-${target.toLowerCase()}`
			);

			if (event.currentTarget.checked) {
				localStorage.setItem(`toggleActive${target}`, "true");
			} else {
				localStorage.removeItem(`toggleActive${target}`);
			}
		});
	}
}
