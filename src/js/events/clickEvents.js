export function scrollToTop() {
  const element = document.querySelector("#buttonScrollUp");

  element.addEventListener("click", () => {
    window.scrollTo({ top: 0 });
  });
}
