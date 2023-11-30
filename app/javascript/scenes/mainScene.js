import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {

  preload() {
    // Chargement des images sur github pour éviter le precompile
    this.load.image('worm', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/images/worm.png');
    this.load.image('tiles', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/tiles/TilesetGraveyard-16-16.png');
    this.load.tilemapTiledJSON('station-fails', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/json/station-fails_231130.json');
    console.log("end of preload")
  }

  create() {
    this.initMap();

    this.worm = this.physics.add.image(100, 140, 'worm').setOrigin(0, 0).setScale(0.1);
    this.worm2 = this.physics.add.image(200, 240, 'worm').setOrigin(0, 0).setScale(0.1);
    this.worm.setDepth(1);

    // Array of tile numbers to add collisions -> Ajouter ici tous les numéros de tuiles qui doivent être des collisions
    const tileNumbersToCollide = [28];

    // Call the function to add collisions to specific tiles
    this.addCollisionsToTiles(tileNumbersToCollide);

    //Physique
    this.physics.world.enable(this.worm);

    this.groundLayer.setCollisionByProperty({collides: true});

    console.log(this.groundLayer)




    this.physics.add.collider(this.worm, this.groundLayer, () => {
      console.log("Collision détectée !");
  });


  this.physics.add.collider(this.worm, this.worm2, () => {
    console.log("Collision détectée !");
});


    // Création du texte (hidden pour faire "parler le ver")
    this.wormText = this.add.text(0, 0, '', { fontSize: '16px', fill: '#fff' });
    this.wormText.setOrigin(0.5);
    this.wormText.setDepth(2);
    this.wormText.setVisible(false);

  }

  update() {

    // Création du curseur
    const cursors = this.input.keyboard.createCursorKeys();

    // Mouvement horizontal
     if (cursors.left.isDown) {
        this.worm.x -= 2;
      } else if (cursors.right.isDown) {
        this.worm.x += 2;
      }

    // Mouvement vertical
      if (cursors.up.isDown) {
        this.worm.y -= 2;
      } else if (cursors.down.isDown) {
        this.worm.y += 2;
      }

      // Vérifier si le ver est sorti de l'écran à gauche
    if (this.worm.x < 0) {
      this.worm.x = this.sys.game.config.width; // Réapparaissez à droite de l'écran
    }

    // Vérifier si le ver est sorti de l'écran à droite
    if (this.worm.x > this.sys.game.config.width) {
      this.worm.x = 0; // Réapparaissez à gauche de l'écran
    }

    // Vérifier si le ver est sorti de l'écran en haut
    if (this.worm.y < 0) {
      this.worm.y = this.sys.game.config.height; // Réapparaissez en bas de l'écran
    }

    // Vérifier si le ver est sorti de l'écran en bas
    if (this.worm.y > this.sys.game.config.height) {
      this.worm.y = 0; // Réapparaissez en haut de l'écran
    }

    // Affichez "WormText" pendant 2 secondes lorsque la touche espace est appuyée
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey('SPACE'), 500)) {
      this.showWormText();
    }

  }

  showWormText() {
    // Mettez à jour la position du texte en fonction de la position du ver
    this.wormText.setPosition(this.worm.x + 200, this.worm.y - 20);

    // Affichez le texte avec les coordonnées du ver
    this.wormText.setText(
      `Position du ver : (${this.worm.x.toFixed(2)}, ${this.worm.y.toFixed(2)})`
    );

    // Affichez le texte pendant 2 secondes
    this.wormText.setVisible(true);
    this.time.delayedCall(2000, () => {
      this.wormText.setVisible(false);
    });
  }

  initMap() {
    //  Initialisation de la carte dans la fonction privée initMap
    this.map = this.make.tilemap({ key: 'station-fails', tileWidth: 16, tileHeight: 16 });
    console.log(this.map)
    console.log("-----------")
    // Ici, mettre le nom du jeu de tuiles, identique à celui mentionné
    this.tileset = this.map.addTilesetImage('TilesetGraveyard-16-16', 'tiles', 16, 16);
    this.groundLayer = this.map.createLayer('Ground', this.tileset);
    console.log(this.groundLayer)
    this.physics.world.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height);

    this.showDebugWalls();

  }


  // Afficher les tiles qui ont la propriété collides = true
  showDebugWalls() {
    const debugGraphics = this.add.graphics().setAlpha(0.7);

    // Iterate through each tile in the ground layer
    this.groundLayer.forEachTile(tile => {
        // Check if the tile has the property 'collides' set to true
        if (tile.properties.collides === true) {
            debugGraphics.fillStyle(0xE6E6E6, 1); // Set the colliding tile color
            debugGraphics.fillRect(tile.pixelX, tile.pixelY, tile.width, tile.height);
        }
    }, this);

    // Remove the default debug rendering method
    this.groundLayer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: null,
    });
}

  addCollisionsToTiles(tileNumbers) {
    this.my_tiles = [];
    this.groundLayer.forEachTile(tile => {
      // Check if the tile number is in the array
      if (tileNumbers.includes(tile.index)) {
        const newTile = this.physics.add.image(tile.x * 16, tile.y * 16, 'worm').setOrigin(0, 0).setScale(0.1);
        this.physics.world.enableTile(tile);
        this.my_tiles.push(newTile);
        this.physics.world.enable(newTile);

        // Add collision logic here if needed
        newTile.setCollideWorldBounds(true);
        this.physics.add.collider(newTile, /* Other collidable object */);
      }
    });

    console.log(this.my_tiles);
  }

}
