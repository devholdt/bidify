import { updateVisibleCount } from "../utilities/index.js";
import { getItem } from "../storage/index.js";

export function checkboxState(target, container) {
  const checkbox = document.querySelector(`#toggleActive${target}`);

  if (checkbox) {
    const checked = getItem(`toggleActive${target}`);

    if (checked) {
      checkbox.checked = true;
      Array.from(container.children).forEach((card) =>
        card.classList.remove("d-none")
      );
    }

    updateVisibleCount(
      `.profile-${target.toLowerCase()}-active`,
      `.profile-${target.toLowerCase()}`
    );

    checkbox.addEventListener("change", (event) => {
      Array.from(container.children).forEach((card) => {
        if (card.querySelector(".countdown-part").innerHTML === "Expired") {
          card.classList.toggle("d-none", !event.currentTarget.checked);
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
