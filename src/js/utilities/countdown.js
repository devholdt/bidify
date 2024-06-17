/**
 * Adds a countdown to a card element.
 * @param {Element} card - The card element to add the countdown to.
 * @param {string} target - The selector for the target element to add the countdown to.
 * @param {Date} listingEndsAt - The date and time when the countdown should end.
 * @param {Element} container - The container element to add the card to.
 * @returns {Object} An object with the countdown interval and update function.
 * @throws {Error} If any of the arguments are invalid.
 */
export function countdownCard(card, target, listingEndsAt, container) {
	if (!card || !target || !listingEndsAt || !container) {
		throw new Error("Invalid argument");
	}

	const countdownContainer = document.createElement("div");

	countdownContainer.classList.add("countdown");

	const [daysElement, hoursElement, minsElement, secsElement] = [
		...Array(4),
	].map(() => {
		const element = document.createElement("span");

		element.classList.add("countdown-part", "ms-1");

		countdownContainer.appendChild(element);

		return element;
	});

	const targetElement = card.querySelector(target);

	if (!targetElement) {
		throw new Error(`Target element not found: ${target}`);
	}

	targetElement.appendChild(countdownContainer);

	const countdownUpdate = (days, hours, mins, secs) => {
		[daysElement, hoursElement, minsElement, secsElement].forEach(
			(element, index) => {
				element.innerHTML = `${[days, hours, mins, secs][index]}<span>${
					["d", "h", "m", "s"][index]
				}</span>`;
			}
		);
	};

	daysElement.innerHTML = "Loading...";

	const countdownInterval = setInterval(() => {
		const now = new Date();
		const distance = listingEndsAt - now;

		if (distance < 0) {
			clearInterval(countdownInterval);

			[hoursElement, minsElement, secsElement].forEach(
				(element) => (element.style.display = "none")
			);

			daysElement.innerHTML = "Expired";
			daysElement.classList.add("w-auto");

			return;
		}

		const [days, hours, mins, secs] = [
			Math.floor(distance / (1000 * 60 * 60 * 24)),
			Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
			Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
			Math.floor((distance % (1000 * 60)) / 1000),
		];

		countdownUpdate(days, hours, mins, secs);
	}, 250);

	return {
		countdownInterval,
		update: countdownUpdate,
	};
}
