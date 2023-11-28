// app/javascript/packs/mainScene.js
import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {

  preload() {
    this.load.image('worm', '/assets/worm.png');
    this.load.image({
      key: 'tiles',
      url: 'assets/tilemaps/tiles/TilesetGraveyard-16-16.png',
    });
    this.load.tilemapTiledJSON('level_1', 'assets/tilemaps/json/level_1.json');
  }

  create() {
    this.initMap();
    this.square = this.physics.add.image(400, 300, 'worm').setOrigin(0.5, 0.5).setScale(0.1);
    this.square.setDepth(1);

    // Activez la physique pour le carré
    this.physics.world.enable(this.square);

    // Initialisez le texte "Worm" (mais ne l'affichez pas encore)
    this.wormText = this.add.text(0, 0, '', { fontSize: '16px', fill: '#fff' });
    this.wormText.setOrigin(0.5);
    this.wormText.setDepth(2); // Assurez-vous que la profondeur est plus haute que le carré
    this.wormText.setVisible(false);

  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    // Enregistrez la position actuelle avant tout mouvement
    this.previousPosition = { x: this.square.x, y: this.square.y };

    if (!this.isColliding) {
      if (cursors.left.isDown) {
        this.square.x -= 2;
      } else if (cursors.right.isDown) {
        this.square.x += 2;
      }

      if (cursors.up.isDown) {
        this.square.y -= 2;
      } else if (cursors.down.isDown) {
        this.square.y += 2;
      }
      // Vérifiez si le ver est sorti de l'écran à gauche
    if (this.square.x < 0) {
      this.square.x = this.sys.game.config.width; // Réapparaissez à droite de l'écran
    }

    // Vérifiez si le ver est sorti de l'écran à droite
    if (this.square.x > this.sys.game.config.width) {
      this.square.x = 0; // Réapparaissez à gauche de l'écran
    }

    // Vérifiez si le ver est sorti de l'écran en haut
    if (this.square.y < 0) {
      this.square.y = this.sys.game.config.height; // Réapparaissez en bas de l'écran
    }

    // Vérifiez si le ver est sorti de l'écran en bas
    if (this.square.y > this.sys.game.config.height) {
      this.square.y = 0; // Réapparaissez en haut de l'écran
    }
    }

    // Affichez "WormText" pendant 2 secondes lorsque la touche espace est appuyée
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey('SPACE'), 500)) {
      this.showWormText();
    }

  }

  showWormText() {
    // Mettez à jour la position du texte en fonction de la position du ver
    this.wormText.setPosition(this.square.x + 200, this.square.y - 20);

    // Affichez le texte avec les coordonnées du ver
    this.wormText.setText(
      `Position du ver : (${this.square.x.toFixed(2)}, ${this.square.y.toFixed(2)})`
    );

    // Affichez le texte pendant 2 secondes
    this.wormText.setVisible(true);
    this.time.delayedCall(2000, () => {
      this.wormText.setVisible(false);
    });
  }

  initMap() {
    // Initialisation de la carte dans la fonction privée initMap
    this.map = this.make.tilemap({ key: 'level', tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('level', 'tiles');
  }



}
