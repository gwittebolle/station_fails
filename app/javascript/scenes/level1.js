import Phaser from "phaser";
import * as MapFunctions from "../shared/mapFunctions.js";
import * as TileFunctions from "../shared/tileFunctions.js";
import * as SpriteFunctions from "../shared/spriteFunctions.js";
import * as MoveFunctions from "../shared/moveFunctions.js";
import * as MsgFunctions from "../shared/msgFunctions.js";
import * as DebugFunctions from "../shared/debugFunctions.js";

export { MapFunctions, TileFunctions, DebugFunctions };

export default class Level1 extends Phaser.Scene {
  // Store the previous position of the worm
  prevX;
  prevY;
  info_sent_to_html = false;
  isMessageDisplayed = false;
  hasReceivedFundsParents = false;

  preload() {
    // Chargement des images sur github pour éviter le precompile
    this.load.image(
      "worm",
      "https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/images/worm.png"
    );
    this.load.image(
      "transparent-16px",
      "https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/images/transparent-16px.png"
    );
    this.load.image(
      "tiles",
      "https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/tiles/TilesetGraveyard-16-16.png"
    );
    this.load.image(
      "characters",
      "https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/tiles/characters.png"
    );
    this.load.tilemapTiledJSON(
      "station-fails",
      "https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/json/realLevel_1.json"
    );
    this.load.image(
      "shark",
      "https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/images/shark.png"
    );
    this.load.audio("bg-music", [
      "https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/sounds/LastLevelAmbiance.mp3",
    ]);
    this.load.audio("laugh", [
      "https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/sounds/sinister-laugh-140131_9X0djJUZ.mp3",
    ]);
    this.load.audio("death-shark", [
      "https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/sounds/DeathByShark.mp3",
    ]);
    this.load.audio("digging", [
      "https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/sounds/digging.mp3",
    ]);
  }

  async create() {
    await MapFunctions.initMap.call(this);

    // Charger la musique
    const music = this.sound.add("bg-music", { loop: true });

    // Ajouter un gestionnaire d'événements clavier
    this.input.keyboard.on("keydown", function (event) {
      // Vérifier si c'est la première touche enfoncée
      if (!this.keyPressed) {
        // Lancer la musique
        music.setVolume(0.02).play();
        this.keyPressed = true; // Marquer que la touche a été enfoncée
      }
    });

    this.wormGroup = this.physics.add.group();
    this.sharkGroup = this.physics.add.group();

    // Call initSprite to create the worm
    SpriteFunctions.initSprite(this, 75, 450);
    // Add the sprites to their respective groups
    this.wormGroup.add(this.worm);

    // Declare an array to store references to sharks
    this.sharks = [];
    // Create sharks
    this.sharks.push(SpriteFunctions.initXShark(this, 50, 300, 32));
    this.sharks.push(SpriteFunctions.initXShark(this, 520, 400, 64));
    this.sharks.push(SpriteFunctions.initXShark(this, 50, 120, 32));
    // Set collide world bounds for the entire group
    this.physics.world.enable(this.sharks);

    // Add collider for the groups
    this.physics.add.collider(
      this.wormGroup,
      this.sharks,
      this.handleCollision,
      null,
      this
    );

    // Ajoutez un texte pour afficher le niveau en haut à gauche
    const infoBackString = document.querySelector("#level").dataset.project;
    const infoBack = JSON.parse(infoBackString);
    let infoGame = infoBack;
    MsgFunctions.header(infoGame, this);

    // Tuiles solides
    // Chemin local vers le fichier JSON
    const jsonPath =
      "https://raw.githubusercontent.com/gwittebolle/station_fails/master/app/assets/tilemaps/json/realLevel_1.json";
    const tombsLayer = MapFunctions.getTombsLayer();
    const charactersLayer = MapFunctions.getCharactersLayer();

    // Array of tile numbers to add collisions -> Ajouter ici tous les numéros de tuiles qui doivent être des collisions
    TileFunctions.solidTiles(jsonPath).then((data) => {
      const tileNumbersToCollide = data;
      TileFunctions.addCollisionsToTiles(
        tileNumbersToCollide,
        tombsLayer,
        this
      );
      this.collisionDetected = false;

      TileFunctions.solidCharactersTiles(jsonPath).then((data) => {
        const tileCharsToCollide = data;
        TileFunctions.addCollisionsToTiles(
          tileCharsToCollide,
          charactersLayer,
          this
        );
      });

      // Get the collidable tiles directly
      const my_tiles = TileFunctions.getMyTiles();
      infoGame.fundsAddedTiles = infoGame.fundsAddedTiles || new Set();

      this.physics.add.collider(this.worm, my_tiles, (worm, collidedTile) => {
        if (!this.collisionDetected) {
          const tileAtCoordinates = tombsLayer.getTileAtWorldXY(
            collidedTile.x,
            collidedTile.y
          );
          const tileCharacterAtCoordinates = charactersLayer.getTileAtWorldXY(
            collidedTile.x,
            collidedTile.y
          );

          if (tileAtCoordinates) {
            const tileNumber = tileAtCoordinates.index;

            if (
              tileNumber === 26 &&
              !infoGame.fundsAddedTiles.has(
                this.getTileNumber(collidedTile.x, collidedTile.y)
              )
            ) {
              console.log("Collision avec une tombe");
              const diggingSound = this.sound.add("digging");
              diggingSound.play();

              // Afficher un message en bas du jeu
              // Créez un groupe pour le texte et le rectangle
              this.displayGroup = this.add.group();
              // Incrémenter d'un chiffre compris entre 0 et 10 info.funds
              const fundsIncrement = Phaser.Math.Between(500, 1000);
              infoGame.project_funds += fundsIncrement;
              // Marquer la tuile comme touchée dans le Set
              infoGame.fundsAddedTiles.add(
                this.getTileNumber(collidedTile.x, collidedTile.y)
              );
              MsgFunctions.header(infoGame, this);

              MsgFunctions.bottomText(
                `Ci-gît une start-up, ${fundsIncrement}€ par terre, chouette ! `,
                this
              );
              console.log("Nouveaux fonds :", infoGame.funds);
            }
          } else {
            console.log(
              "Pas de tuile tombelayer à la position (",
              collidedTile.x,
              ",",
              collidedTile.y,
              ")"
            );
          }

          if (tileCharacterAtCoordinates) {
            const tileNumber = tileCharacterAtCoordinates.index;
            console.log(tileNumber);
            if (
              tileNumber === 3901 ||
              tileNumber === 3902 ||
              tileNumber === 3935 ||
              tileNumber === 3936
            ) {
              console.log(this.hasReceivedFundsParents);
              if (this.hasReceivedFundsParents) {
                MsgFunctions.bottomText(
                  `Je t'ai déja donné tout mon pécule ! `,
                  this
                );
              } else {
                const fundsIncrementParent = Phaser.Math.Between(1000, 1800);
                infoGame.project_funds += fundsIncrementParent;
                infoGame.fundsAddedTiles.add(
                  this.getTileNumber(collidedTile.x, collidedTile.y)
                );
                MsgFunctions.header(infoGame, this);

                this.displayGroup = this.add.group();
                MsgFunctions.bottomText(
                  `Bonjour mon cher enfant ! Voici ${fundsIncrementParent} € pour ton projet ! `,

                  this
                );
                this.hasReceivedFundsParents = true;
              }
            }
            if (
              tileNumber === 2677 ||
              tileNumber === 2678 ||
              tileNumber === 2711 ||
              tileNumber === 2712
            ) {
              const laughSound = this.sound.add("laugh");
              laughSound.play();

              // Afficher un message en bas du jeu
              // Créez un groupe pour le texte et le rectangle
              this.displayGroup = this.add.group();
              MsgFunctions.bottomText(
                `Moi aussi je fouille les tombes pour me lancer ! `,
                this
              );
            }
          } else {
          }

          this.collisionDetected = true;
          worm.x = this.prevX;
          worm.y = this.prevY;
        }
      });
    });

    // Array of winning numbers-> Ajouter ici tous les numéros de tuiles qui doivent être des tuiles gagnantes
    TileFunctions.winningTiles(jsonPath).then((data) => {
      const tileNumbersToWin = data;

      // Créez un groupe pour stocker les sprites des tuiles gagnantes
      this.winningTilesGroup = this.physics.add.group();

      // Parcourez chaque tuile de la carte
      tombsLayer.forEachTile((tile) => {
        // Vérifiez si la tuile actuelle est une tuile gagnante
        if (tileNumbersToWin.includes(tile.index)) {
          // Créez un sprite pour la tuile gagnante
          const winningTile = this.physics.add
            .sprite(tile.getCenterX(), tile.getCenterY(), "transparent-16px")
            .setOrigin(0.5, 0.5);

          // Ajoutez le sprite à un groupe
          this.winningTilesGroup.add(winningTile);

          // Ajoutez un collider entre this.worm et le sprite de la tuile gagnante
          const collider = this.physics.add.collider(
            this.worm,
            winningTile,
            () => {
              // Code à exécuter lors de la collision entre this.worm et une tuile gagnante
              if (this.info_sent_to_html === false) {
                document.getElementById("level_funds").value =
                  infoGame.project_funds;
                document.getElementById("level_employees").value =
                  infoGame.project_employees;
                this.info_sent_to_html = true;
              }

              MsgFunctions.bottomText(`Fin du niveau`, this);
              // Stop the music
              music.stop();

              this.isMessageDisplayed = false;

              // Désactivez le collider après la collision pour éviter les déclenchements continus
              collider.destroy();

              setTimeout(() => {
                // Soumettre le formulaire
                const gameForm = document.getElementById("game-form");
                gameForm.submit();
              }, 2000);
            }
          );
        }
      });
    });

    // Création du texte (hidden pour faire "parler le ver")
    SpriteFunctions.textSprite(this);
  }

  update() {
    // Store the previous position of the worm
    this.prevX = this.worm.x;
    this.prevY = this.worm.y;

    // Empêchez le mouvement si le message est affiché
    if (this.isMessageDisplayed) {
      return;
    }

    MoveFunctions.move(this);

    // Affichez "WormText" pendant 2 secondes lorsque la touche espace est appuyée
    if (
      this.input.keyboard.checkDown(this.input.keyboard.addKey("SPACE"), 500)
    ) {
      MsgFunctions.showWormText(this);
    }

    // Réinitialisez la variable de statut en collision = false à chaque frame
    this.collisionDetected = false;
    // Vérifiez la collision avec les tuiles
    this.physics.add.collider(this.worm, this.my_tiles, (worm) => {
      if (!this.collisionDetected) {
        // Indiquer la collision
        this.collisionDetected = true;
        // Replacer le ver
        worm.x = this.prevX;
        worm.y = this.prevY;
      }
    });
  }

  getTileNumber(x, y) {
    const tileSize = 16; // Taille d'une tuile (en pixels)
    const columns = 40; // Nombre de colonnes dans la disposition des tuiles

    const tileX = Math.floor(x / tileSize);
    const tileY = Math.floor(y / tileSize);

    const tileNumber = tileX + tileY * columns;

    return tileNumber;
  }

  handleCollision(worm, shark) {
    // This function will be called when a collision occurs
    // Add your logic here, for example, resetting the worm's position
    const deathSharkSound = this.sound.add("death-shark");
    deathSharkSound.play();

    // Reset the worm to its initial position
    this.resetWormPosition();
    MsgFunctions.bottomText(" Projet dévoré par un requin 🦈 !", this);
  }

  resetWormPosition() {
    // Set the worm's position back to its initial position
    this.worm.setPosition(75, 450);
  }
}
