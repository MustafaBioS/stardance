import { Controller } from "@hotwired/stimulus";

const SELECTED_CLASS = "ysws-queue__row--selected";
const SELECTING_CLASS = "ysws-queue__table-container--selecting";

export default class extends Controller {
  static targets = ["start", "confirm", "cancel", "table", "form", "row"];

  start() {
    this.selecting = true;
  }

  confirm() {
    const ids = this.rowTargets
      .filter((row) => row.classList.contains(SELECTED_CLASS))
      .map((row) => row.dataset.reviewId);

    if (ids.length === 0) {
      this.selecting = false;
      return;
    }

    this.formTarget
      .querySelectorAll('input[name="review_ids[]"]')
      .forEach((input) => input.remove());

    ids.forEach((id) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "review_ids[]";
      input.value = id;
      this.formTarget.appendChild(input);
    });

    this.formTarget.requestSubmit();
  }

  cancel() {
    this.rowTargets.forEach((row) => row.classList.remove(SELECTED_CLASS));
    this.selecting = false;
  }

  toggleRow(event) {
    if (!this.selecting) return;

    event.preventDefault();
    event.currentTarget.classList.toggle(SELECTED_CLASS);
  }

  get selecting() {
    return this.tableTarget.classList.contains(SELECTING_CLASS);
  }

  set selecting(active) {
    this.tableTarget.classList.toggle(SELECTING_CLASS, active);
    this.startTarget.hidden = active;
    this.confirmTarget.disabled = !active;
    this.cancelTarget.disabled = !active;
  }
}
