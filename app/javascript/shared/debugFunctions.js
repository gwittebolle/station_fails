// debugFunctions.js

  // Afficher les tiles qui ont la propriété collides = true
  export function showDebugWalls() {
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
