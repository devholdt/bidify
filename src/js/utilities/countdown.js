export function countdownCard(card, target, listingEndsAt, container) {
	if (!card || !target || !listingEndsAt || !container) {
		throw new Error("Invalid argument");
	}

	const countdownContainer = document.createElement("div");
	countdownContainer.classList.add("countdown");

	const daysElement = document.createElement("span");
	const hoursElement = document.createElement("span");
	const minsElement = document.createElement("span");
	const secsElement = document.createElement("span");

	const elements = [daysElement, hoursElement, minsElement, secsElement];
	elements.forEach((element) => {
		element.classList.add("countdown-part", "ms-1");
		countdownContainer.appendChild(element);
	});

	const targetElement = card.querySelector(target);
	if (!targetElement) {
		throw new Error(`Target element not found: ${target}`);
	}
	targetElement.appendChild(countdownContainer);

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

function updateCountdown(
	endDate,
	daysElement,
	hoursElement,
	minsElement,
	secsElement
) {
	if (
		!endDate ||
		!daysElement ||
		!hoursElement ||
		!minsElement ||
		!secsElement
	) {
		throw new Error("Invalid argument");
	}

	const now = new Date();
	const distance = endDate - now;

	if (distance < 0) {
		clearInterval(daysElement.countdownInterval);
		[hoursElement, minsElement, secsElement].forEach(
			(element) => (element.style.display = "none")
		);

		daysElement.innerHTML = "Expired";
		daysElement.classList.add("w-auto");
		const cardElement = daysElement.closest(".card");
		if (cardElement) {
			cardElement.classList.add("expired-listing");
		}
		return;
	}

	const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((distance % (1000 * 60)) / 1000);

	daysElement.innerHTML = `${days}<span>d</span>`;
	hoursElement.innerHTML = `${hours}<span>h</span>`;
	minsElement.innerHTML = `${minutes}<span>m</span>`;
	secsElement.innerHTML = `${seconds}<span>s</span>`;
}
