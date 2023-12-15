/**
 * Initializes the functionality for scrolling titles in card elements.
 */
export function scrollingTitle() {
  const carousel = document.getElementById("listingsCarousel");

  if (carousel) {
    carousel.addEventListener("slid.bs.carousel", () => {
      addScrollingTitleClass();
    });
  }

  addScrollingTitleClass();
}

/**
 * Applies a scrolling effect to titles in card elements if they overflow their container.
 */
function addScrollingTitleClass() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const titleWrapper = card.querySelector(".title-wrapper");
    const titleElement = card.querySelector("h5");

    if (titleWrapper) {
      titleWrapper.style.setProperty(
        "--title-wrapper-width",
        `${titleWrapper.clientWidth}px`
      );
      if (titleElement.scrollWidth > titleWrapper.clientWidth) {
        titleElement.classList.add("scrolling-title");
      } else {
        titleElement.classList.remove("scrolling-title");
      }
    }
  });
}
