export function countdownCard(card, listingEndsAt, container) {
  const countdownContainer = document.createElement("div");
  countdownContainer.classList.add("countdown");

  const daysElement = document.createElement("span");
  const hoursElement = document.createElement("span");
  const minsElement = document.createElement("span");
  const secsElement = document.createElement("span");

  [daysElement, hoursElement, minsElement, secsElement].forEach((element) => {
    element.classList.add("countdown-part");
    countdownContainer.appendChild(element);
  });

  card.querySelector(".card-top").appendChild(countdownContainer);

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

  if (daysElement.innerHTML === "Expired") {
    card.classList.add("d-none");

    card.querySelector(".card-img-top").style.opacity = "50%";
    card.querySelector(".card-body").style.opacity = "50%";
    card.querySelector(".countdown-part").style.backgroundColor = "#FF5252";
  }
}

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
  }
}

export function expiredState() {}
