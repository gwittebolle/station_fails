// mapFunctions.js

let tombsLayer
let charactersLayer

export function initMap() {
  //  Initialisation de la carte dans la fonction privée initMap
  this.map = this.make.tilemap({ key: 'station-fails', tileWidth: 16, tileHeight: 16 });
  // Ici, mettre le nom du jeu de tuiles, identique à celui mentionné
  this.tileset = this.map.addTilesetImage('TilesetGraveyard-16-16', 'tiles', 16, 16);
  this.tileset2 = this.map.addTilesetImage('characters', 'characters', 16, 16);
  this.groundLayer = this.map.createLayer('Ground', this.tileset);
  this.physics.world.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height);
  tombsLayer = this.map.createLayer('Tombs', this.tileset);
  this.physics.world.setBounds(0, 0, tombsLayer.width, tombsLayer.height);
  charactersLayer = this.map.createLayer('PNJ', this.tileset2);
  this.physics.world.setBounds(0, 0, charactersLayer.width, charactersLayer.height);

  // this.showDebugWalls();
}


export const getTombsLayer = () => {
  return tombsLayer;
};

export const getCharactersLayer = () => {
  return charactersLayer;
};
