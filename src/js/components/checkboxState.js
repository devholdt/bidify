import { updateVisibleCount } from "../utilities/index.js";
import { getItem, setItem } from "../storage/index.js";

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
