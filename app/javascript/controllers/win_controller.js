import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="win"
export default class extends Controller {
 static targets = ["music"]


 connect() {
  document.addEventListener("keyup", () => {
    this.musicTarget.play();
  })
 }
}
