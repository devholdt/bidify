export function scrollToTop() {
	const element = document.querySelector("#buttonScrollUp button");

	element.addEventListener("click", () => {
		window.scrollTo({ top: 0 });
	});
}
