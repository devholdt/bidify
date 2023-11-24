export function scrollingTitle() {
  const carousel = document.getElementById("listingsCarousel");

  if (carousel) {
    function addScrollingTitleClass() {
      const carouselInner = carousel.querySelector(".carousel-inner");
      const active = carouselInner.querySelector(".active");

      const cards = active.querySelectorAll(".card");

      cards.forEach((card) => {
        const titleWrapper = card.querySelector(".title-wrapper");
        const titleElement = card.querySelector("h5");

        titleWrapper.style.setProperty(
          "--title-wrapper-width",
          `${titleWrapper.clientWidth}px`
        );

        if (titleElement.scrollWidth > titleWrapper.clientWidth) {
          titleElement.classList.add("scrolling-title");
        } else {
          titleElement.classList.remove("scrolling-title");
        }
      });
    }

    addScrollingTitleClass();

    carousel.addEventListener("slid.bs.carousel", () => {
      addScrollingTitleClass();
    });
  }
}
