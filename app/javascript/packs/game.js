// app/javascript/packs/game.js
import Phaser from 'phaser';
import MainScene from '../scenes/mainScene';

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  physics: {
    default: 'arcade', // You can choose a different physics engine if needed
    arcade: {
      gravity: { y: 0 }, // Set your desired gravity
      debug: true // Set to true for debugging physics
    }
  },
  scene: MainScene,
};

const game = new Phaser.Game(config);
