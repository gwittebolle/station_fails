import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["navbar"];

  connect() {
    console.log("Stimulus controller connected");
    const currentPage = document.location.pathname;
    console.log("Current page:", currentPage);
    console.log(window.innerWidth)

    if (window.innerWidth < 600) {
      if (currentPage !== "/pages/phone" && currentPage !== "/users/sign_in" && currentPage !== "/users/sign_up") {
        console.log("Redirecting to /pages/phone");
        document.location.href = "/pages/phone";
      }

      if (currentPage === "/") {
        console.log("Redirecting to /pages/phone from root");
        document.location.href = "/pages/phone";
      }
    }

    if (window.innerWidth < 600) {
      this.navbarTarget.classList.add("d-none");
      document.querySelector("#page-container").style.minHeight = "92vh";
    }
  }
}
