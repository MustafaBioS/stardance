import { Controller } from "@hotwired/stimulus";

const SELECTED_CLASS = "ysws-queue__row--selected";
const SELECTING_CLASS = "ysws-queue__table-container--selecting";

export default class extends Controller {
  static targets = ["start", "confirm", "cancel", "table", "row"];

  start() {
    this.selecting = true;
  }

  confirm() {
    this.selecting = false;
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
    this.confirmTarget.hidden = !active;
    this.cancelTarget.hidden = !active;
  }
}
