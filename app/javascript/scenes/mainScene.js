import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {

  // Store the previous position of the worm
  prevX;
  prevY;

  preload() {
    // Chargement des images sur github pour éviter le precompile
    this.load.image('worm', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/images/worm.png');
    this.load.image('transparent-16px', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/images/transparent-16px.png');
    this.load.image('tiles', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/tiles/TilesetGraveyard-16-16.png');
    this.load.image('characters', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/tiles/05-devout.png');
    this.load.tilemapTiledJSON('station-fails', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/json/station-fails_231201.json');
  }

  create() {
    this.initMap();

    this.worm = this.physics.add.image(75, 450, 'worm').setOrigin(0, 0).setScale(0.08);
    this.worm.setDepth(1);

    // Ajoutez un texte pour afficher le niveau en haut à gauche
    // Accéder à @level.index
    // const levelIndex = window.levelData.index;
    const infoBackString = document.querySelector("#level").dataset.project;
    const infoBack = JSON.parse(infoBackString);

    this.nameText = this.add.text(10, 10, 'Projet ' + infoBack.name, { fontSize: '25px', fill: '#fff' });
    this.nameText.setDepth(2);
    this.levelText = this.add.text(10, 40, 'Niveau ' + infoBack.level, { fontSize: '20px', fill: '#1EDD88' });
    this.levelText.setDepth(2);
    this.foundText = this.add.text(10, 60, 'Fonds ' + infoBack.funds + ' €', { fontSize: '20px', fill: '#1EDD88' });
    this.foundText.setDepth(2);


    // Tuiles solides
    // Chemin local vers le fichier JSON
    const jsonPath = 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/json/station-fails_231130_soir.json';

    // Array of tile numbers to add collisions -> Ajouter ici tous les numéros de tuiles qui doivent être des collisions
    this.solidTiles(jsonPath).then(data => {
      const tileNumbersToCollide = data
      this.addCollisionsToTiles(tileNumbersToCollide);
      this.collisionDetected = false;
    })

    // Array of tile numbers to add collisions -> Ajouter ici tous les numéros de tuiles qui doivent être des tuiles gagnantes
    this.winningTiles(jsonPath).then(data => {
      const tileNumbersToWin = data;

      // Créez un groupe pour stocker les sprites des tuiles gagnantes
      this.winningTilesGroup = this.physics.add.group();

      // Parcourez chaque tuile de la carte
      this.tombsLayer.forEachTile(tile => {
        // Vérifiez si la tuile actuelle est une tuile gagnante
        if (tileNumbersToWin.includes(tile.index)) {
          // Créez un sprite pour la tuile gagnante
          const winningTile = this.physics.add.sprite(tile.getCenterX(), tile.getCenterY(), 'transparent-16px').setOrigin(0.5, 0.5);

          // Ajoutez le sprite à un groupe
          this.winningTilesGroup.add(winningTile);

          // Ajoutez un collider entre this.worm et le sprite de la tuile gagnante
          this.physics.add.collider(this.worm, winningTile, () => {
            // Code à exécuter lors de la collision entre this.worm et une tuile gagnante
            msgText.setText('Victoire');
            this.tweens.add({
              targets: this.victoryDisplayGroup.getChildren(),
              alpha: 1,
              ease: 'Linear',
              onComplete: () => {
                // Masquez à nouveau le rectangle et le texte après quelques secondes
                this.time.delayedCall(1000, () => {
                  this.tweens.add({
                    targets: this.victoryDisplayGroup.getChildren(),
                    alpha: 0,
                    ease: 'Linear'
                  });
                });
              }
            });
          });
        }
      });

      // Rectangle de message
      // Créez un groupe pour le texte et le rectangle
      this.victoryDisplayGroup = this.add.group();

      // Créez le rectangle avec le fond noir et la bordure en pointillés
      const backgroundRect = this.add.rectangle(this.sys.game.config.width / 2, this.sys.game.config.height - 25, this.sys.game.config.width - 20, 50, 0x000000);
      backgroundRect.setStrokeStyle(2, 0xFFFFFF, 1);
      backgroundRect.setOrigin(0.5, 0.5);
      backgroundRect.setAlpha(0); // Masquez initialement le rectangle

      // Ajoutez le rectangle au groupe
      this.victoryDisplayGroup.add(backgroundRect);

      // Créez le texte du message
      const msgText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height - 25, '', { fontSize: '20px', fill: '#FFFFFF' });
      msgText.setOrigin(0.5, 0.5);
      msgText.setAlpha(0); // Masquez initialement le texte

      // Ajoutez le texte au groupe
      this.victoryDisplayGroup.add(msgText);

    });


    //Physique
    this.physics.world.enable(this.worm);
    this.physics.add.collider(this.worm, this.my_tiles)

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
    this.prevX = this.worm.x;
    this.prevY = this.worm.y;

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

    // Réinitialisez la variable de statut lorsque le ver est déplacé
    this.collisionDetected = false;

    // Vérifiez la collision avec les tuiles
    this.physics.add.collider(this.worm, this.my_tiles, (worm) => {
      if (!this.collisionDetected) {
        console.log("Collision détectée !");
        this.collisionDetected = true;
        worm.x = this.prevX;
        worm.y = this.prevY;
      }
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
    this.tileset2 = this.map.addTilesetImage('characters', 'characters', 16, 16);
    this.groundLayer = this.map.createLayer('Ground', this.tileset);
    this.physics.world.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height);
    this.tombsLayer = this.map.createLayer('Tombs', this.tileset);
    this.physics.world.setBounds(0, 0, this.tombsLayer.width, this.tombsLayer.height);
    this.charactersLayer = this.map.createLayer('PNG', this.tileset2);
    console.log(this.charactersLayer)
    this.physics.world.setBounds(0, 0, this.charactersLayer.width, this.charactersLayer.height);

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
        resolve(trueIds)
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

  winningTiles(jsonPath) {
    // Retourne une promesse pour permettre l'asynchronisme
    return new Promise((resolve, reject) => {
      // Fonction pour traiter le JSON
      function processJsonData(jsonData) {
        // Tableau pour stocker les IDs avec la valeur "true"
        const winningTiles = [];
        jsonData.tilesets[0].tiles.forEach((tile) => {
          // Vérifie si la propriété "collides" a la valeur "true"
          //Tuiles gagnantes
          const specialTiles = [33, 34, 45, 46];
          if (specialTiles.includes(tile.id)) {
            winningTiles.push(tile.id);
          }
        });
        // Résout la promesse avec l'array trueIds
        resolve(winningTiles);
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
