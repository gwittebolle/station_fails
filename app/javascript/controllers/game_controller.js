import { Controller } from "@hotwired/stimulus";
import Phaser from "phaser";
import Level1 from "../scenes/level1.js";
import Level2 from "../scenes/level2.js";
import Level3 from "../scenes/level3.js";
import Level4 from "../scenes/level4.js";

// Connects to data-controller="game"
export default class extends Controller {

  static targets = ["div", "script"]

  CONFIG = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    parent: "level",
    physics: {
      default: "arcade", // You can choose a different physics engine if needed
      arcade: {
        gravity: { y: 0 }, // Set your desired gravity
        debug: false, // Set to true for debugging physics
      },
    },
    scene: null,
  };
  connect() {
    this.writeTitle(30000);
    const infoBackString = document.querySelector("#level").dataset.project;
    const infoBack = JSON.parse(infoBackString);
    let levelIndex = infoBack.level;
    this.setSceneByIndex(levelIndex);

    if (!localStorage.loaded) {
      localStorage.setItem("loaded", "yes");
      window.location.reload();
    } else {
      localStorage.setItem("loaded", "");
    }

    const game = new Phaser.Game(this.CONFIG);
  }

  setSceneByIndex(index) {
    console.log(index);
    switch (index) {
      case 1:
        this.CONFIG.scene = Level1;
        break;
      case 2:
        this.CONFIG.scene = Level2;
        break;
      case 3:
        this.CONFIG.scene = Level3;
        break;
      case 4:
        this.CONFIG.scene = Level4;
        break;
      default:
        this.CONFIG.scene = Level1;
        console.error("Index de niveau non valide");
    }
  }
  writeTitle(duration) {
    console.log("coucou");
    const scriptElement = this.scriptTarget;

    const originalScript = scriptElement.innerText;

      const startTime = Date.now();

      function update() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        scriptElement.classList.add("game-story")
        scriptElement.classList.remove("d-none")
        scriptElement.innerText = originalScript.substring(0, Math.floor(progress * originalScript.length));

        console.log(scriptElement.innerText)
          requestAnimationFrame(update)
      }

      update();
  }
}
