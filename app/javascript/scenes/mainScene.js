import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {

  preload() {
    // Chargement des images sur github pour éviter le precompile
    this.load.image('worm', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/images/worm.png');
    this.load.image('transparent-16px', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/images/transparent-16px.png');
    this.load.image('tiles', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/tiles/TilesetGraveyard-16-16.png');
    this.load.tilemapTiledJSON('station-fails', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/json/station-fails_231130_soir.json');
  }

  create() {
    this.initMap();

    this.worm = this.physics.add.image(100, 300, 'worm').setOrigin(0, 0).setScale(0.08);
    this.worm.setDepth(1);

  // Chemin local vers le fichier JSON
  const jsonPath = 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/json/station-fails_231130_soir.json';

  // Array of tile numbers to add collisions -> Ajouter ici tous les numéros de tuiles qui doivent être des collisions
  const tileNumbersToCollide = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143];
  this.solidTiles(jsonPath).then(data => {
    const tileNumbersToCollide2 = data
    this.addCollisionsToTiles(tileNumbersToCollide2);
  })

    //Physique
    this.physics.world.enable(this.worm);

    this.physics.add.collider(this.worm, this.my_tiles, () => {
      console.log("Collision détectée !");
  });

  this.physics.add.collider(this.worm, this.my_tiles, () => {
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

        // Store the previous position of the worm
        const prevX = this.worm.x;
        const prevY = this.worm.y;

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

    // Check for collisions with my_tiles
    this.physics.add.collider(this.worm, this.my_tiles, (worm, tile) => {
      // Handle collision here
      // For example, prevent movement by reverting to the previous position
      this.worm.x = prevX;
      this.worm.y = prevY;
      console.log("Collision detected!");
  });
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
    // Ici, mettre le nom du jeu de tuiles, identique à celui mentionné
    this.tileset = this.map.addTilesetImage('TilesetGraveyard-16-16', 'tiles', 16, 16);
    this.groundLayer = this.map.createLayer('Ground', this.tileset);
    this.physics.world.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height);
    this.tombsLayer = this.map.createLayer('Tombs', this.tileset);
    this.physics.world.setBounds(0, 0, this.tombsLayer.width, this.tombsLayer.height);

    // this.showDebugWalls();

  }

  solidTiles(jsonPath) {
    // Retourne une promesse pour permettre l'asynchronisme
    return new Promise((resolve, reject) => {
      // Fonction pour traiter le JSON
      function processJsonData(jsonData) {
        // Tableau pour stocker les IDs avec la valeur "true"
        const trueIds = [];
        jsonData.tilesets[0].tiles.forEach((tile) => {
          // Vérifie si la propriété "collides" a la valeur "true"
          if (tile.properties[0].value) {
            trueIds.push(tile.id);
          }
        });
        // Résout la promesse avec l'array trueIds
        resolve(trueIds);
      }

      // Fonction pour récupérer le JSON
      fetch(jsonPath)
        .then(response => {
          // Vérifie si la requête a réussi
          if (!response.ok) {
            throw new Error(`Erreur de chargement du JSON : ${response.statusText}`);
          }
          // Convertit la réponse en JSON
          return response.json();
        })
        .then(jsonData => {
          // Appelle la fonction pour traiter le JSON
          processJsonData(jsonData);
        })
        .catch(error => {
          // Rejette la promesse avec l'erreur
          reject(`Une erreur s'est produite lors du chargement du JSON : ${error.message}`);
        });
    });
  }


  addCollisionsToTiles(tileNumbers) {
    this.my_tiles = [];
    this.tombsLayer.forEachTile(tile => {
      // Check if the tile number is in the array
      if (tileNumbers.includes(tile.index)) {
        const newTile = this.physics.add.image(tile.x * 16, tile.y * 16, 'transparent-16px').setOrigin(0, 0);
        this.my_tiles.push(newTile);
        this.physics.world.enable(newTile);

        // Add collision logic here if needed
        newTile.setCollideWorldBounds(true);
        this.physics.add.collider(newTile, /* Other collidable object */);
      }
    });

  }


// FONCTIONS DE DEBUGGAGE

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



}
