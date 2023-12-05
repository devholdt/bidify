export const detailsListItem = (label, value) => {
  return `
    <li class="list-group-item d-flex justify-content-between">
      <span class="fw-normal">${label}</span>
      <span class="fw-light">${value}</span>
    </li>`;
};
