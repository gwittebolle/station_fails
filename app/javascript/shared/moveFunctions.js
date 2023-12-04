
export function move(context) {
  // Création du curseur
  const cursors = context.input.keyboard.createCursorKeys();


  // Mouvement horizontal
  if (cursors.left.isDown) {
    context.worm.x -= 4;
  } else if (cursors.right.isDown) {
    context.worm.x += 4;
  }

  // Mouvement vertical
  if (cursors.up.isDown) {
    context.worm.y -= 4;
  } else if (cursors.down.isDown) {
    context.worm.y += 4;
  }

  // Vérifier si le ver est sorti de l'écran à gauche
  if (context.worm.x < 0) {
    context.worm.x = context.sys.game.config.width; // Réapparaissez à droite de l'écran
  }

  // Vérifier si le ver est sorti de l'écran à droite
  if (context.worm.x > context.sys.game.config.width) {
    context.worm.x = 0; // Réapparaissez à gauche de l'écran
  }

  // Vérifier si le ver est sorti de l'écran en haut
  if (context.worm.y < 0) {
    context.worm.y = context.sys.game.config.height; // Réapparaissez en bas de l'écran
  }

  // Vérifier si le ver est sorti de l'écran en bas
  if (context.worm.y > context.sys.game.config.height) {
    context.worm.y = 0; // Réapparaissez en haut de l'écran
  }
}
