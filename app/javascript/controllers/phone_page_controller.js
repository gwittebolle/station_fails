import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="phone-page"
export default class extends Controller {
  static targets = ["navbar"];
  connect() {
    if (
      window.innerWidth < 600 &&
      !(document.location.pathname === "/pages/phone")
    ) {
      document.location.href = "/pages/phone";
    }

    if (window.innerWidth < 600) {
      this.navbarTarget.classList.add("d-none");
      document.querySelector("#page-container").style.minHeight = "92vh";
    }
  }
}
