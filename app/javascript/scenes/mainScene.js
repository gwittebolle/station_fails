import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {

  preload() {
    this.load.image('worm', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/images/worm.png');
    this.load.image('tiles', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/tiles/graveyard-16-16.png');
    this.load.tilemapTiledJSON('station-fails', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/json/station-fails.json');
  }

  create() {
    this.initMap();
    this.sprite = this.physics.add.image(320, 250, 'worm').setOrigin(0, 0).setScale(0.1);
    this.sprite.setDepth(1);

    // Activez la physique pour le carré
    this.physics.world.enable(this.sprite);

    this.physics.add.collider(this.sprite, this.collisionLayer, () => {
      console.log("Collision détectée !");
      console.log("Sprite position: ", this.sprite.x, this.sprite.y);
    });


    // Initialisez le texte "Worm" (mais ne l'affichez pas encore)
    this.wormText = this.add.text(0, 0, '', { fontSize: '16px', fill: '#fff' });
    this.wormText.setOrigin(0.5);
    this.wormText.setDepth(2); // Assurez-vous que la profondeur est plus haute que le carré
    this.wormText.setVisible(false);

  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    // Enregistrez la position actuelle avant tout mouvement
    this.previousPosition = { x: this.sprite.x, y: this.sprite.y };

      if (cursors.left.isDown) {
        this.sprite.x -= 2;
      } else if (cursors.right.isDown) {
        this.sprite.x += 2;
      }

      if (cursors.up.isDown) {
        this.sprite.y -= 2;
      } else if (cursors.down.isDown) {
        this.sprite.y += 2;
      }
      // Vérifiez si le ver est sorti de l'écran à gauche
    if (this.sprite.x < 0) {
      this.sprite.x = this.sys.game.config.width; // Réapparaissez à droite de l'écran
    }

    // Vérifiez si le ver est sorti de l'écran à droite
    if (this.sprite.x > this.sys.game.config.width) {
      this.sprite.x = 0; // Réapparaissez à gauche de l'écran
    }

    // Vérifiez si le ver est sorti de l'écran en haut
    if (this.sprite.y < 0) {
      this.sprite.y = this.sys.game.config.height; // Réapparaissez en bas de l'écran
    }

    // Vérifiez si le ver est sorti de l'écran en bas
    if (this.sprite.y > this.sys.game.config.height) {
      this.sprite.y = 0; // Réapparaissez en haut de l'écran
    }

    // Affichez "WormText" pendant 2 secondes lorsque la touche espace est appuyée
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey('SPACE'), 500)) {
      this.showWormText();
    }

  }



  initMap() {
    //  Initialisation de la carte dans la fonction privée initMap
    this.map = this.make.tilemap({ key: 'station-fails', tileWidth: 16, tileHeight: 16 });
    console.log(this.map)
    console.log("-----------")
    // Ici, mettre le nom du jeu de tuiles, identique à celui mentionné
    this.tileset = this.map.addTilesetImage('graveyard-16-16', 'tiles');
    const ground = this.map.createLayer('Ground', this.tileset);
    this.collisionLayer = this.map.createLayer('Tombs', this.tileset);

    this.physics.world.setBounds(0, 0, this.collisionLayer.width, this.collisionLayer.height);
    this.map.setCollisionByProperty({ collides: true }, true, true, this.collisionLayer);

    this.collisionLayer.forEachTile((tile) => {
      const tileProperties = tile.properties;
        // Si la propriété collides est définie et égale à true
      if (tileProperties && tileProperties.collides === true) {
        console.log('Tile with collides = true:', tile);
      }
    });


    this.showDebugWalls();

  }

  showDebugWalls() {
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.collisionLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(230, 230, 230, 255),
    });
  }

  showWormText() {
    // Mettez à jour la position du texte en fonction de la position du ver
    this.wormText.setPosition(this.sprite.x + 200, this.sprite.y - 20);

    // Affichez le texte avec les coordonnées du ver
    this.wormText.setText(
      `Position du ver : (${this.sprite.x.toFixed(2)}, ${this.sprite.y.toFixed(2)})`
    );

    // Affichez le texte pendant 2 secondes
    this.wormText.setVisible(true);
    this.time.delayedCall(2000, () => {
      this.wormText.setVisible(false);
    });
  }

}
