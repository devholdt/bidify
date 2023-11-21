export function updateCountdown(
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

  daysElement.innerHTML = `${days}d`;
  hoursElement.innerHTML = `${hours}h`;
  minsElement.innerHTML = `${minutes}m`;
  secsElement.innerHTML = `${seconds}s`;

  if (distance < 0) {
    clearInterval(daysElement.countdownInterval);
    [hoursElement, minsElement, secsElement].forEach(
      (element) => (element.style.display = "none")
    );

    daysElement.innerHTML = "Expired";
  }
}
