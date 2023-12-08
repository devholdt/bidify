export function elementVisibility(target, display, scrollY) {
  const element = document.querySelector(target);

  window.addEventListener("scroll", () => {
    if (window.scrollY >= scrollY) {
      element.classList.remove("d-none");
      element.classList.add(display);
    } else {
      element.classList.remove(display);
      element.classList.add("d-none");
    }
  });
}
