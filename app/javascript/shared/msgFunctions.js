
export function header(info, context) {
context.nameText = context.add.text(10, 10, 'Projet ' + info.name, { fontSize: '25px', fill: '#fff' });
context.nameText.setDepth(2);
context.levelText = context.add.text(10, 40, 'Niveau ' + info.level, { fontSize: '20px', fill: '#1EDD88' });
context.levelText.setDepth(2);
context.foundText = context.add.text(10, 60, 'Fonds ' + info.funds + ' €', { fontSize: '20px', fill: '#1EDD88' });
context.foundText.setDepth(2)
}



export function showWormText(context) {
  // Mettez à jour la position du texte en fonction de la position du ver
  context.wormText.setPosition(context.worm.x + 200, context.worm.y - 20);
  // Affichez le texte avec les coordonnées du ver
  context.wormText.setText(
    `Position du ver : (${context.worm.x.toFixed(2)}, ${context.worm.y.toFixed(2)})`
  );

  // Affichez le texte pendant 2 secondes
  context.wormText.setVisible(true);
  context.time.delayedCall(2000, () => {
    context.wormText.setVisible(false);
  });
}
