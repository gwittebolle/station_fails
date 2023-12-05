// tileFunctions.js

let my_tiles = []

export function solidTiles(jsonPath) {

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

export function solidCharactersTiles(jsonPath) {

  // Retourne une promesse pour permettre l'asynchronisme
  return new Promise((resolve, reject) => {
    // Fonction pour traiter le JSON
    function processJsonData(jsonData) {
      // Tableau pour stocker les IDs avec la valeur "true"
      const trueIds = [];
      jsonData.tilesets[1].tiles.forEach((tile) => {
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

export function winningTiles(jsonPath) {
  // Retourne une promesse pour permettre l'asynchronisme
  return new Promise((resolve, reject) => {
    // Fonction pour traiter le JSON
    function processJsonData(jsonData) {
      // Tableau pour stocker les IDs avec la valeur "true"
      const winningTiles = [];
      jsonData.tilesets[0].tiles.forEach((tile) => {
        // Vérifie si la propriété "collides" a la valeur "true"
        //Tuiles gagnantes
        const specialTiles = [21,22];
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


export function addCollisionsToTiles(tileNumbers, layer, context) {
  layer.forEachTile(tile => {
    // Check if the tile number is in the array
    if (tileNumbers.includes(tile.index)) {
      const newTile = context.physics.add.image(tile.x * 16, tile.y * 16, 'transparent-16px').setOrigin(0, 0);
      my_tiles.push(newTile);
      context.physics.world.enable(newTile);

      // Add collision logic here if needed
      newTile.setCollideWorldBounds(true);
      context.physics.add.collider(newTile);
    }

  });

}

export const getMyTiles = () => my_tiles;
