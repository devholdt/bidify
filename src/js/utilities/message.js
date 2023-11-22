export function message(type, content, target, duration = 2000) {
  const element = document.querySelector(target);

  element.innerHTML = `<p class="message ${type}">${content}</p>`;

  if (duration !== null) {
    setTimeout(() => {
      element.innerHTML = "";
    }, duration);
  }
}

export function alert(type, content, target, duration = 2000) {
  const element = document.querySelector(target);

  const wrapper = document.createElement("div");

  wrapper.innerHTML = `
  <div class="alert alert-${type} alert-dismissible" role="alert">
    <div class="w-75">${content}</div>
    <button type="button" class="btn-close m-auto p-0 w-25 h-100" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;

  element.append(wrapper);

  if (duration !== null) {
    setTimeout(() => {
      wrapper.innerHTML = "";
    }, duration);
  }
}
