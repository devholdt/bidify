/**
 * Adds a countdown to a card element.
 * @param {HTMLElement} card - The card element to add the countdown to.
 * @param {string} target - The target selector within the card to add the countdown to.
 * @param {Date} listingEndsAt - The date the listing ends at.
 * @param {HTMLElement} container - The container element to append the card to.
 */
export function countdownCard(card, target, listingEndsAt, container) {
	const countdownContainer = document.createElement("div");
	countdownContainer.classList.add("countdown");

	const daysElement = document.createElement("span");
	const hoursElement = document.createElement("span");
	const minsElement = document.createElement("span");
	const secsElement = document.createElement("span");

	[daysElement, hoursElement, minsElement, secsElement].forEach((element) => {
		element.classList.add("countdown-part", "ms-1");
		countdownContainer.appendChild(element);
	});

	card.querySelector(target).appendChild(countdownContainer);

	updateCountdown(
		listingEndsAt,
		daysElement,
		hoursElement,
		minsElement,
		secsElement
	);
	countdownContainer.countdownInterval = setInterval(() => {
		updateCountdown(
			listingEndsAt,
			daysElement,
			hoursElement,
			minsElement,
			secsElement
		);
	}, 1000);

	container.appendChild(card);
}

/**
 * Updates the countdown elements with the remaining time.
 * @param {Date} endDate - The date the countdown ends at.
 * @param {HTMLElement} daysElement - The element to display the remaining days in.
 * @param {HTMLElement} hoursElement - The element to display the remaining hours in.
 * @param {HTMLElement} minsElement - The element to display the remaining minutes in.
 * @param {HTMLElement} secsElement - The element to display the remaining seconds in.
 */
function updateCountdown(
	endDate,
	daysElement,
	hoursElement,
	minsElement,
	secsElement
) {
	const now = new Date();
	const distance = endDate - now;

	let days = Math.floor(distance / (1000 * 60 * 60 * 24));
	let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((distance % (1000 * 60)) / 1000);

	daysElement.innerHTML = `${days}<span>d</span>`;
	hoursElement.innerHTML = `${hours}<span>h</span>`;
	minsElement.innerHTML = `${minutes}<span>m</span>`;
	secsElement.innerHTML = `${seconds}<span>s</span>`;

	if (distance < 0) {
		clearInterval(daysElement.countdownInterval);
		[hoursElement, minsElement, secsElement].forEach(
			(element) => (element.style.display = "none")
		);

		daysElement.innerHTML = "Expired";
		daysElement.classList.add("w-auto");
		daysElement.closest("tr").classList.add("expired-bid");
	}
}
