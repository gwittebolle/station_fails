import { Controller } from "@hotwired/stimulus"
import Phaser from 'phaser';
import Level1 from '../scenes/level1.js';
import Level2 from '../scenes/level2.js';
import Level3 from '../scenes/level3.js';

// Connects to data-controller="game"
export default class extends Controller {
  static targets = ["div"]

  CONFIG = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    parent: "level",
    physics: {
      default: 'arcade', // You can choose a different physics engine if needed
      arcade: {
        gravity: { y: 0 }, // Set your desired gravity
        debug: false // Set to true for debugging physics
      }
    },
    scene: Level2,
  };
  connect() {
    // const levelIndex = 2;
    // console.log(levelIndex) ;
    // this.setSceneByIndex(levelIndex);
    const game = new Phaser.Game(this.CONFIG);
    // this.divTarget.insertAdjacentHTML("beforeend", game)
  }

  setSceneByIndex(index) {
    switch (index) {
      case "1":
        this.CONFIG.scene = Level1;
        break;
      case "2":
        this.CONFIG.scene = Level2;
        break;
      case "3":
        this.CONFIG.scene = Level3;
        break;
      default:
        this.CONFIG.scene = Level1;
        console.error("Index de niveau non valide");
    }
  }
}
