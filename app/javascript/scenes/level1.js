import Phaser from 'phaser';
import * as MapFunctions from '../shared/mapFunctions.js';
import * as TileFunctions from '../shared/tileFunctions.js';
import * as SpriteFunctions from '../shared/spriteFunctions.js';
import * as MoveFunctions from '../shared/moveFunctions.js';
import * as MsgFunctions from '../shared/msgFunctions.js';
import * as DebugFunctions from '../shared/debugFunctions.js';

export { MapFunctions, TileFunctions, DebugFunctions };

export default class Level1 extends Phaser.Scene {

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

  async create() {
    await MapFunctions.initMap.call(this);

    SpriteFunctions.initSprite(this, 75, 450)

    // Ajoutez un texte pour afficher le niveau en haut à gauche
    const infoBackString = document.querySelector("#level").dataset.project;
    const infoBack = JSON.parse(infoBackString);
    MsgFunctions.header(infoBack, this)

    // Tuiles solides
    // Chemin local vers le fichier JSON
    const jsonPath = 'https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/json/station-fails_231201.json';
    const tombsLayer = MapFunctions.getTombsLayer();

    // Array of tile numbers to add collisions -> Ajouter ici tous les numéros de tuiles qui doivent être des collisions
    TileFunctions.solidTiles(jsonPath).then(data => {
      const tileNumbersToCollide = data
      TileFunctions.addCollisionsToTiles(tileNumbersToCollide, tombsLayer, this);
      this.collisionDetected = false;

        // Get the collidable tiles directly
      const my_tiles = TileFunctions.getMyTiles();
      this.physics.add.collider(this.worm, my_tiles, (worm) => {
        if (!this.collisionDetected) {
          console.log("Collision détectée !");
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

    // Création du texte (hidden pour faire "parler le ver")
    SpriteFunctions.textSprite(this)
  }

  update() {

    // Store the previous position of the worm
    this.prevX = this.worm.x;
    this.prevY = this.worm.y;

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
        console.log("Collision détectée !");
        this.collisionDetected = true;
        // Replacer le ver
        worm.x = this.prevX;
        worm.y = this.prevY;
      }
    });
  }
}
