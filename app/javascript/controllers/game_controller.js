import { Controller } from "@hotwired/stimulus"
import Phaser from 'phaser';
import Level1 from '../scenes/level1.js';

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
        debug: true // Set to true for debugging physics
      }
    },
    scene: Level1,
  };
  connect() {
    const game = new Phaser.Game(this.CONFIG);
    // this.divTarget.insertAdjacentHTML("beforeend", game)
  }
}
