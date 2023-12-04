import Phaser from 'phaser';
import * as MapFunctions from '../shared/mapFunctions.js';
import * as TileFunctions from '../shared/tileFunctions.js';
import * as SpriteFunctions from '../shared/spriteFunctions.js';
import * as MoveFunctions from '../shared/moveFunctions.js';
import * as MsgFunctions from '../shared/msgFunctions.js';
import * as DebugFunctions from '../shared/debugFunctions.js';

export { MapFunctions, TileFunctions, DebugFunctions };

export default class Level3 extends Phaser.Scene {

  // Store the previous position of the worm
  prevX;
  prevY;
  info_sent_to_html = false
  isMessageDisplayed = false;

  preload() {
    // Chargement des images sur github pour éviter le precompile
    this.load.image('worm', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/images/worm.png');
    this.load.image('transparent-16px', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/images/transparent-16px.png');
    this.load.image('tiles', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/tiles/TilesetGraveyard-16-16.png');
    this.load.image('characters', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/tiles/TTVyDQ.png');
    this.load.tilemapTiledJSON('station-fails', 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/json/realLevel_3.json');
  }

  async create() {
    await MapFunctions.initMap.call(this);

    SpriteFunctions.initSprite(this, 75, 450)

    // Ajoutez un texte pour afficher le niveau en haut à gauche
    const infoBackString = document.querySelector("#level").dataset.project;
    const infoBack = JSON.parse(infoBackString);
    let infoGame = infoBack
    MsgFunctions.header(infoGame, this)

    // Tuiles solides
    // Chemin local vers le fichier JSON
    const jsonPath = 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/json/realLevel_3.json';
    const tombsLayer = MapFunctions.getTombsLayer();

    // Array of tile numbers to add collisions -> Ajouter ici tous les numéros de tuiles qui doivent être des collisions
    TileFunctions.solidTiles(jsonPath).then(data => {
      const tileNumbersToCollide = data
      TileFunctions.addCollisionsToTiles(tileNumbersToCollide, tombsLayer, this);
      this.collisionDetected = false;

        // Get the collidable tiles directly
      const my_tiles = TileFunctions.getMyTiles();
      infoGame.fundsAddedTiles = infoGame.fundsAddedTiles || new Set();

      this.physics.add.collider(this.worm, my_tiles, (worm, collidedTile) => {
        if (!this.collisionDetected) {

          const tileAtCoordinates = tombsLayer.getTileAtWorldXY(collidedTile.x, collidedTile.y);

          if (tileAtCoordinates) {
            const tileNumber = tileAtCoordinates.index;

            if (tileNumber === 26 && !infoGame.fundsAddedTiles.has(this.getTileNumber(collidedTile.x, collidedTile.y))) {
              console.log("Collision avec une tombe");
              // Afficher un message en bas du jeu
                // Créez un groupe pour le texte et le rectangle
                this.displayGroup = this.add.group();
              // Incrémenter d'un chiffre compris entre 0 et 10 info.funds
              const fundsIncrement = Phaser.Math.Between(2, 10);
              infoGame.funds += fundsIncrement;
              // Marquer la tuile comme touchée dans le Set
              infoGame.fundsAddedTiles.add(this.getTileNumber(collidedTile.x, collidedTile.y));
              MsgFunctions.header(infoGame, this)

              MsgFunctions.bottomText(`Ci-gît une start-up, ${fundsIncrement}€ par terre, chouette ! `, this)
              console.log("Nouveaux fonds :", infoGame.funds);

            }
          } else {
            console.log("Pas de tuile à la position (", collidedTile.x, ",", collidedTile.y, ")");
          }

          this.collisionDetected = true;
          worm.x = this.prevX;
          worm.y = this.prevY;

        }

      });

    })

    // Array of winning numbers-> Ajouter ici tous les numéros de tuiles qui doivent être des tuiles gagnantes
    TileFunctions.winningTiles(jsonPath).then(data => {
      const tileNumbersToWin = data;

      // Créez un groupe pour stocker les sprites des tuiles gagnantes
      this.winningTilesGroup = this.physics.add.group();

      // Parcourez chaque tuile de la carte
      tombsLayer.forEachTile(tile => {
        // Vérifiez si la tuile actuelle est une tuile gagnante
        if (tileNumbersToWin.includes(tile.index)) {
          // Créez un sprite pour la tuile gagnante
          const winningTile = this.physics.add.sprite(tile.getCenterX(), tile.getCenterY(), 'transparent-16px').setOrigin(0.5, 0.5);

          // Ajoutez le sprite à un groupe
          this.winningTilesGroup.add(winningTile);

          // Ajoutez un collider entre this.worm et le sprite de la tuile gagnante
          const collider = this.physics.add.collider(this.worm, winningTile, () => {
            // Code à exécuter lors de la collision entre this.worm et une tuile gagnante
            if (this.info_sent_to_html === false) {
              document.getElementById('level_rank').value = infoGame.funds;
              document.getElementById('level_metrics').value = infoGame.metrics;
              this.info_sent_to_html = true;
            }

            MsgFunctions.bottomText(`Fin du niveau`, this);

            this.isMessageDisplayed = false;

            // Get the form container by its class
            const formContainer = document.querySelector('.form-actions');
            console.log(formContainer)

            // Toggle the visibility of the form based on the game state
            formContainer.classList.remove('d-none');

            // Désactivez le collider après la collision pour éviter les déclenchements continus
            collider.destroy();
          });
        }
      });
    });


    // Création du texte (hidden pour faire "parler le ver")
    SpriteFunctions.textSprite(this)
  }

  update() {

    // Store the previous position of the worm
    this.prevX = this.worm.x;
    this.prevY = this.worm.y;

      // Empêchez le mouvement si le message est affiché
    if (this.isMessageDisplayed) {
    return;
    }


    MoveFunctions.move(this)

    // Affichez "WormText" pendant 2 secondes lorsque la touche espace est appuyée
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey('SPACE'), 500)) {
      MsgFunctions.showWormText(this);
    }

    // Réinitialisez la variable de statut en collision = false à chaque frame
    this.collisionDetected = false;
    // Vérifiez la collision avec les tuiles
    this.physics.add.collider(this.worm, this.my_tiles, (worm) => {
      if (!this.collisionDetected) {
        // Indiquer la collision
        console.log("Collision détectée !!!");
        this.collisionDetected = true;
        // Replacer le ver
        worm.x = this.prevX;
        worm.y = this.prevY;

      }
    });
  }

  getTileNumber(x, y) {
    const tileSize = 16;  // Taille d'une tuile (en pixels)
    const columns = 40;   // Nombre de colonnes dans la disposition des tuiles

    const tileX = Math.floor(x / tileSize);
    const tileY = Math.floor(y / tileSize);
    console.log(x, y, tileX, tileY)

    const tileNumber = tileX + tileY * columns;

    return tileNumber;
  }
}
